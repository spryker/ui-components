import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { globbySync } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const ROOT_GAP = path.relative(process.cwd(), ROOT_DIR);

const locales = globbySync('*', {
    cwd: __dirname,
    deep: 1,
    onlyDirectories: true,
});

const localeFiles = locales.reduce(
    (acc, locale) => ({
        ...acc,
        [locale]: globbySync(`*/src/i18n/${locale}.ts`, {
            cwd: ROOT_DIR,
        }),
    }),
    {},
);

const localeInputs = Object.fromEntries(
    Object.entries(localeFiles).map(([locale, files]) => [
        locale,
        files.reduce(
            (acc, file) => ({
                ...acc,
                [getPackageName(file)]: path.join(ROOT_GAP, file),
            }),
            {
                empty1: path.join(__dirname, 'empty1.ts'),
                empty2: path.join(__dirname, 'empty2.ts'),
            },
        ),
    ]),
);

export default locales
    .filter((locale) => localeFiles[locale].length)
    .map((locale) => ({
        input: localeInputs[locale],
        output: {
            dir: path.resolve(__dirname, locale, 'src/data'),
            format: 'es',
            chunkFileNames: '[name].ts',
            sourcemap: false,
            manualChunks: () => 'data',
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({
                types: ['node', 'jest'],
                exclude: ['**/*.spec.ts', '**/*.stories.ts'],
                tsconfig: './tsconfig.base.json',
                sourceMap: false,
            }),
        ],
    }));

function getPackageName(path) {
    return path.split('/')[0];
}
