#!/usr/bin/env node
/**
 * Pixel *diff* for the Angular 20.3 → 22 migration (phases 3, 4, 6, 7).
 *
 * `assert-pixel-baseline.mjs` only asserts that one screenshot exists per named CSF export. That
 * is the phase 1 gate. From phase 3 on, library source changes, and the gate has to answer a
 * different question: **did anything render differently?** This script answers that by decoding
 * both PNGs and comparing them pixel by pixel.
 *
 * ## Why not a hash
 *
 * Phase 1 measured two consecutive captures of an unchanged tree: 182 of 184 PNGs were
 * byte-identical, and `selectcomponent--multi-select` and `treeselectcomponent--primary` were not
 * — sub-pixel antialiasing on the ant-select arrow. A hash check therefore reports two false
 * positives on every single run, which is the fastest possible way to teach everyone to ignore
 * the visual gate. The comparison is a per-pixel one with a small tolerance instead.
 *
 * A story counts as CHANGED when either:
 *   - its dimensions differ from the baseline, or
 *   - more than `--max-diff-ratio` of its pixels (with a `--max-diff-pixels` floor) differ by more
 *     than `--channel-tolerance` on any channel.
 *
 * ## Usage
 *
 *   npm run build:storybook
 *   npm run pixel:serve &
 *   npm run pixel:capture:current      # captures into .pixel-current/
 *   npm run pixel:compare
 *
 * Flags: --baseline <dir> --current <dir> --channel-tolerance <n> --max-diff-pixels <n>
 *        --max-diff-ratio <f> --json <file> --quiet
 *
 * Exit code 0 when every story matches, 1 when any story changed, is missing or is new.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { inflateSync } from 'zlib';
import { join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');

const argOf = (flag, fallback) => {
    const index = process.argv.indexOf(flag);

    return index === -1 ? fallback : process.argv[index + 1];
};

const hasFlag = (flag) => process.argv.includes(flag);

const BASELINE_DIR = resolve(ROOT, argOf('--baseline', process.env.PIXEL_BASELINE_DIR || '.pixel-baseline'));
const CURRENT_DIR = resolve(ROOT, argOf('--current', process.env.PIXEL_CURRENT_DIR || '.pixel-current'));
const INDEX_FILE = resolve(ROOT, argOf('--index', 'dist/storybook/global/index.json'));
const JSON_REPORT = argOf('--json', null);
const QUIET = hasFlag('--quiet');

/**
 * A channel may drift by this much before the pixel counts as different.
 *
 * 24/255 is deliberately loose per pixel and paired with a very tight *count* budget below: the
 * observed noise is antialiasing on a glyph edge, which moves a handful of pixels a long way, not
 * many pixels a little way. A loose per-pixel threshold with a tight count catches a real visual
 * change (which moves thousands of pixels) while ignoring a redrawn arrow.
 */
const CHANNEL_TOLERANCE = Number(argOf('--channel-tolerance', '24'));

/** Absolute floor, so a small image is not judged by ratio alone. */
const MAX_DIFF_PIXELS = Number(argOf('--max-diff-pixels', '120'));

/** Fraction of the image allowed to differ, for images large enough for the floor to be silly. */
const MAX_DIFF_RATIO = Number(argOf('--max-diff-ratio', '0.0008'));

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Bytes per pixel, by PNG colour type. Only the 8-bit non-interlaced types are supported. */
const CHANNELS_BY_COLOUR_TYPE = { 0: 1, 2: 3, 4: 2, 6: 4 };

/**
 * Decodes an 8-bit, non-interlaced PNG to raw samples.
 *
 * Hand-rolled on purpose: the repo root must keep `package-lock.json` untouched by this phase, so
 * no `pngjs`/`pixelmatch` dependency may be added. Playwright writes 8-bit RGB (colour type 2)
 * here, and the four unfiltering cases below are the whole of the PNG filter spec.
 */
const decodePng = (file) => {
    const buffer = readFileSync(file);

    if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
        throw new Error(`${file}: not a PNG`);
    }

    let offset = 8;
    let header = null;
    const idat = [];

    while (offset < buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        const data = buffer.subarray(offset + 8, offset + 8 + length);

        if (type === 'IHDR') {
            header = {
                width: data.readUInt32BE(0),
                height: data.readUInt32BE(4),
                depth: data[8],
                colourType: data[9],
                interlace: data[12],
            };
        } else if (type === 'IDAT') {
            idat.push(data);
        } else if (type === 'IEND') {
            break;
        }

        offset += 12 + length;
    }

    if (!header) {
        throw new Error(`${file}: no IHDR chunk`);
    }

    const channels = CHANNELS_BY_COLOUR_TYPE[header.colourType];

    if (header.depth !== 8 || header.interlace !== 0 || !channels) {
        throw new Error(
            `${file}: unsupported PNG (bit depth ${header.depth}, colour type ${header.colourType}, ` +
                `interlace ${header.interlace}). The capture harness writes 8-bit non-interlaced PNGs.`,
        );
    }

    const raw = inflateSync(Buffer.concat(idat));
    const stride = header.width * channels;
    const pixels = Buffer.alloc(stride * header.height);

    for (let y = 0; y < header.height; y++) {
        const filter = raw[y * (stride + 1)];
        const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
        const out = y * stride;
        const prior = out - stride;

        for (let x = 0; x < stride; x++) {
            const left = x >= channels ? pixels[out + x - channels] : 0;
            const up = y > 0 ? pixels[prior + x] : 0;
            const upLeft = y > 0 && x >= channels ? pixels[prior + x - channels] : 0;
            let value = line[x];

            switch (filter) {
                case 0:
                    break;
                case 1:
                    value += left;
                    break;
                case 2:
                    value += up;
                    break;
                case 3:
                    value += (left + up) >> 1;
                    break;
                case 4: {
                    const p = left + up - upLeft;
                    const pa = Math.abs(p - left);
                    const pb = Math.abs(p - up);
                    const pc = Math.abs(p - upLeft);

                    value += pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
                    break;
                }
                default:
                    throw new Error(`${file}: unknown PNG filter type ${filter} on row ${y}`);
            }

            pixels[out + x] = value & 0xff;
        }
    }

    return { ...header, channels, stride, pixels };
};

/** Counts pixels whose channels drift further than the tolerance. */
const diffPixels = (a, b) => {
    let changed = 0;
    let maxChannelDelta = 0;

    for (let i = 0; i < a.pixels.length; i += a.channels) {
        let differs = false;

        for (let c = 0; c < a.channels; c++) {
            const delta = Math.abs(a.pixels[i + c] - b.pixels[i + c]);

            if (delta > maxChannelDelta) {
                maxChannelDelta = delta;
            }

            if (delta > CHANNEL_TOLERANCE) {
                differs = true;
            }
        }

        if (differs) {
            changed++;
        }
    }

    return { changed, maxChannelDelta };
};

/**
 * Maps a story id back to the CSF export name it was declared as, so a failure names the thing a
 * developer can grep for. `storyNameFromExport` is the same transform `assert-pixel-baseline.mjs`
 * uses, run backwards over the source enumeration.
 */
const buildExportNameIndex = () => {
    const byId = new Map();

    if (!existsSync(INDEX_FILE)) {
        return byId;
    }

    const { storyNameFromExport } = require('storybook/internal/csf');
    const index = JSON.parse(readFileSync(INDEX_FILE, 'utf-8'));
    const exportsByFile = new Map();

    const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);

            if (entry.isDirectory()) {
                if (entry.name !== 'node_modules' && entry.name !== 'dist') {
                    walk(full);
                }
            } else if (entry.name.endsWith('.stories.ts')) {
                const names = [...readFileSync(full, 'utf-8').matchAll(/^export const ([A-Za-z0-9_]+)/gm)].map(
                    (match) => match[1],
                );

                exportsByFile.set(`./${relative(ROOT, full)}`, names);
            }
        }
    };

    walk(resolve(ROOT, 'libs'));

    for (const entry of Object.values(index.entries || {})) {
        if (entry.type !== 'story') {
            continue;
        }

        const names = exportsByFile.get(entry.importPath) || [];
        const exportName = names.find((name) => storyNameFromExport(name) === entry.name);

        byId.set(entry.id, {
            exportName: exportName || '(export name not found)',
            title: entry.title,
            name: entry.name,
            importPath: entry.importPath,
        });
    }

    return byId;
};

const pngsIn = (dir) =>
    existsSync(dir) ? new Set(readdirSync(dir).filter((file) => file.endsWith('.png'))) : new Set();

const baseline = pngsIn(BASELINE_DIR);
const current = pngsIn(CURRENT_DIR);

if (baseline.size === 0) {
    console.error(`pixel compare: no baseline PNGs in ${BASELINE_DIR}. Phase 1 captures them.`);
    process.exit(1);
}

if (current.size === 0) {
    console.error(
        `pixel compare: no PNGs in ${CURRENT_DIR}. Build Storybook, run "npm run pixel:serve" and ` +
            'then "npm run pixel:capture:current" first.',
    );
    process.exit(1);
}

const meta = buildExportNameIndex();
const describe = (id) => {
    const entry = meta.get(id);

    return entry ? `${entry.exportName}  (${entry.title} / ${entry.name})  ${entry.importPath}` : id;
};

const changed = [];
const missing = [];
const added = [];
const unreadable = [];
let identical = 0;

for (const file of [...baseline].sort()) {
    const id = file.replace(/\.png$/, '');

    if (!current.has(file)) {
        missing.push(id);
        continue;
    }

    let before;
    let after;

    try {
        before = decodePng(join(BASELINE_DIR, file));
        after = decodePng(join(CURRENT_DIR, file));
    } catch (error) {
        unreadable.push({ id, message: error.message });
        continue;
    }

    if (before.width !== after.width || before.height !== after.height || before.channels !== after.channels) {
        changed.push({
            id,
            reason: `size ${before.width}x${before.height} -> ${after.width}x${after.height}`,
            changedPixels: null,
        });
        continue;
    }

    const { changed: changedPixels, maxChannelDelta } = diffPixels(before, after);
    const total = before.width * before.height;
    const budget = Math.max(MAX_DIFF_PIXELS, Math.floor(total * MAX_DIFF_RATIO));

    if (changedPixels > budget) {
        changed.push({
            id,
            reason:
                `${changedPixels}/${total} pixels differ (${((changedPixels / total) * 100).toFixed(3)}%), ` +
                `budget ${budget}, max channel delta ${maxChannelDelta}`,
            changedPixels,
        });
    } else {
        identical++;

        if (changedPixels > 0 && !QUIET) {
            console.log(
                `  tolerated ${String(changedPixels).padStart(4)} px (budget ${budget}, ` +
                    `max delta ${maxChannelDelta})  ${id}`,
            );
        }
    }
}

for (const file of [...current].sort()) {
    if (!baseline.has(file)) {
        added.push(file.replace(/\.png$/, ''));
    }
}

console.log('');
console.log(`baseline : ${relative(ROOT, BASELINE_DIR)} (${baseline.size} PNGs)`);
console.log(`current  : ${relative(ROOT, CURRENT_DIR)} (${current.size} PNGs)`);
console.log(
    `tolerance: channel <= ${CHANNEL_TOLERANCE}, changed pixels <= max(${MAX_DIFF_PIXELS}, ` +
        `${MAX_DIFF_RATIO} of the image)`,
);
console.log(`unchanged: ${identical}   changed: ${changed.length}   missing: ${missing.length}   new: ${added.length}`);

if (JSON_REPORT) {
    writeFileSync(
        resolve(ROOT, JSON_REPORT),
        `${JSON.stringify(
            {
                baselineDir: relative(ROOT, BASELINE_DIR),
                currentDir: relative(ROOT, CURRENT_DIR),
                tolerance: {
                    channelTolerance: CHANNEL_TOLERANCE,
                    maxDiffPixels: MAX_DIFF_PIXELS,
                    maxDiffRatio: MAX_DIFF_RATIO,
                },
                unchanged: identical,
                changed: changed.map((entry) => ({ ...entry, ...(meta.get(entry.id) || {}) })),
                missing: missing.map((id) => ({ id, ...(meta.get(id) || {}) })),
                added: added.map((id) => ({ id, ...(meta.get(id) || {}) })),
                unreadable,
            },
            null,
            4,
        )}\n`,
    );
    console.log(`report   : ${JSON_REPORT}`);
}

const problems = changed.length + missing.length + added.length + unreadable.length;

if (problems === 0) {
    console.log('\nOK: every story renders pixel-identical to the phase 1 baseline (within tolerance).');
    process.exit(0);
}

console.error(`\nPIXEL DIFF — ${problems} problem(s):\n`);

for (const entry of changed) {
    console.error(`  CHANGED  ${describe(entry.id)}\n           ${entry.reason}`);
}

for (const id of missing) {
    console.error(`  MISSING  ${describe(id)} — captured in the baseline, absent now`);
}

for (const id of added) {
    console.error(`  NEW      ${describe(id)} — captured now, absent from the baseline`);
}

for (const entry of unreadable) {
    console.error(`  UNREADABLE ${describe(entry.id)} — ${entry.message}`);
}

console.error('');
process.exit(1);
