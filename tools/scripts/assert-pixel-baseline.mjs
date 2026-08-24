#!/usr/bin/env node
/**
 * Gate for the Angular 20.3 → 22 migration pixel baseline (phase 1).
 *
 * Asserts a three-way agreement, and fails loudly naming the offending export on any mismatch:
 *
 *   1. the named CSF exports found in `libs/**\/*.stories.ts` (the source of truth),
 *   2. the `type: "story"` entries in the built Storybook index (what actually rendered),
 *   3. the PNG files in the baseline directory (what was actually captured).
 *
 * The expected count is derived at run time, never hard-coded: stories get added, and a gate
 * pinned to yesterday's number stops being a gate the moment someone writes a story.
 *
 * Usage: node tools/scripts/assert-pixel-baseline.mjs [--index <index.json>] [--dir <baseline>]
 */
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { storyNameFromExport } = require('storybook/internal/csf');

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');

const argOf = (flag, fallback) => {
    const index = process.argv.indexOf(flag);

    return index === -1 ? fallback : process.argv[index + 1];
};

const INDEX_FILE = resolve(ROOT, argOf('--index', 'dist/storybook/global/index.json'));
const BASELINE_DIR = resolve(ROOT, argOf('--dir', process.env.PIXEL_BASELINE_DIR || '.pixel-baseline'));

const problems = [];

const fail = (message) => problems.push(message);

/** Recursively collect every `*.stories.ts` under `libs/`, mirroring the phase 1 enumeration. */
const findStoryFiles = (dir) => {
    const found = [];

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== 'dist') {
                found.push(...findStoryFiles(full));
            }
        } else if (entry.name.endsWith('.stories.ts')) {
            found.push(full);
        }
    }

    return found;
};

// 1. Source enumeration — the same `^export const <name>` shape the plan verified by grep.
const storyFiles = findStoryFiles(resolve(ROOT, 'libs')).sort();
const sourceExports = new Map();

for (const file of storyFiles) {
    const contents = readFileSync(file, 'utf-8');
    const names = [...contents.matchAll(/^export const ([A-Za-z0-9_]+)/gm)].map((match) => match[1]);
    const key = `./${relative(ROOT, file)}`;

    if (names.length === 0) {
        fail(`${key}: is a *.stories.ts file with no named CSF export — the enumeration may be wrong`);
        continue;
    }

    // Shapes the plan verified are absent. If one appears, the grep-shaped count is no longer sound.
    if (/^export (function|class|let|var) /m.test(contents)) {
        fail(`${key}: uses an "export function/class/let/var" story form the enumeration cannot see`);
    }

    if (/\b(includeStories|excludeStories)\b/.test(contents)) {
        fail(`${key}: uses includeStories/excludeStories, so named exports no longer map 1:1 to stories`);
    }

    sourceExports.set(key, names);
}

const totalSourceExports = [...sourceExports.values()].reduce((sum, names) => sum + names.length, 0);

// 2. Runtime enumeration — what the built Storybook actually indexed.
if (!existsSync(INDEX_FILE)) {
    console.error(`pixel baseline: no Storybook index at ${INDEX_FILE}. Run "npm run build:storybook" first.`);
    process.exit(1);
}

const index = JSON.parse(readFileSync(INDEX_FILE, 'utf-8'));
const indexStories = Object.values(index.entries || {}).filter((entry) => entry.type === 'story');
const indexByFile = new Map();

for (const entry of indexStories) {
    if (!indexByFile.has(entry.importPath)) {
        indexByFile.set(entry.importPath, []);
    }

    indexByFile.get(entry.importPath).push(entry);
}

// 3. Captured images.
const captured = existsSync(BASELINE_DIR)
    ? new Set(readdirSync(BASELINE_DIR).filter((file) => file.endsWith('.png')))
    : new Set();

// Source vs index, per file, per export name.
for (const [file, names] of sourceExports) {
    const entries = indexByFile.get(file) || [];
    const indexed = new Set(entries.map((entry) => entry.name));

    for (const name of names) {
        if (!indexed.has(storyNameFromExport(name))) {
            fail(`${file}: export "${name}" has no story in the Storybook index`);
        }
    }

    if (entries.length !== names.length) {
        fail(`${file}: ${names.length} named export(s) in source but ${entries.length} indexed story/stories`);
    }
}

for (const file of indexByFile.keys()) {
    if (!sourceExports.has(file)) {
        fail(`${file}: indexed by Storybook but not found by the source enumeration`);
    }
}

// Index vs captured images.
for (const entry of indexStories) {
    if (!captured.has(`${entry.id}.png`)) {
        fail(`${entry.id}: NO SCREENSHOT — "${entry.title} / ${entry.name}" from ${entry.importPath}`);
    }
}

const expectedFiles = new Set(indexStories.map((entry) => `${entry.id}.png`));

for (const file of captured) {
    if (!expectedFiles.has(file)) {
        fail(`${file}: a screenshot with no matching story in the Storybook index`);
    }
}

console.log(`named CSF exports in libs/**/*.stories.ts : ${totalSourceExports} across ${storyFiles.length} files`);
console.log(`story entries in ${relative(ROOT, INDEX_FILE)} : ${indexStories.length} across ${indexByFile.size} files`);
console.log(`screenshots in ${relative(ROOT, BASELINE_DIR)} : ${captured.size}`);

if (problems.length > 0) {
    console.error(`\nPIXEL BASELINE MISMATCH — ${problems.length} problem(s):\n`);
    problems.forEach((problem) => console.error(`  - ${problem}`));
    console.error('\nThe visual gate is not usable until every one of these is resolved.\n');
    process.exit(1);
}

console.log('\nOK: one screenshot per named CSF export, cross-checked against source and index.');
