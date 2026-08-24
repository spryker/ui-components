#!/usr/bin/env node
/**
 * Minimal static file server for a built Storybook.
 *
 * The pixel baseline is captured against the *static build*, not against `storybook:serve`:
 * the dev server recompiles lazily, which makes the first capture of each chunk race the
 * webpack build and turns a pixel baseline into a flake generator.
 *
 * Usage: node tools/scripts/serve-storybook-static.mjs [--dir dist/storybook/global] [--port 6006]
 */
import { createServer } from 'http';
import { createReadStream, existsSync, statSync } from 'fs';
import { extname, join, normalize, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');

const argOf = (flag, fallback) => {
    const index = process.argv.indexOf(flag);

    return index === -1 ? fallback : process.argv[index + 1];
};

const DIR = resolve(ROOT, argOf('--dir', 'dist/storybook/global'));
const PORT = Number(argOf('--port', '6006'));

const MIME = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain; charset=utf-8',
    '.wasm': 'application/wasm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

if (!existsSync(DIR)) {
    console.error(`No Storybook build at ${DIR}. Run "npm run build:storybook" first.`);
    process.exit(1);
}

createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relativePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    let file = join(DIR, relativePath);

    if (existsSync(file) && statSync(file).isDirectory()) {
        file = join(file, 'index.html');
    }

    if (!file.startsWith(DIR) || !existsSync(file)) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not found');

        return;
    }

    response.writeHead(200, {
        'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
    });
    createReadStream(file).pipe(response);
}).listen(PORT, '127.0.0.1', () => console.log(`Serving ${DIR} on http://127.0.0.1:${PORT}`));
