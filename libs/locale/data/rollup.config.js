import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
const globby = import('globby');

const ROOT_DIR = path.resolve(__dirname, '../..');
const ROOT_GAP = path.relative(process.cwd(), ROOT_DIR);

const locales = globby.then(({ globbySync }) =>
    globbySync('*', {
        cwd: __dirname,
        deep: 1,
        onlyDirectories: true,
    }),
);

const localeFiles = locales.then((locales) =>
    locales.reduce(
        (acc, locale) => ({
            ...acc,
            [locale]: globby.then(({ globbySync }) =>
                globbySync(`*/src/i18n/${locale}.ts`, {
                    cwd: ROOT_DIR,
                }),
            ),
        }),
        {},
    ),
);

const localeInputs = async () => {
    const getLocaleFiles = await localeFiles;
    const entries = Object.entries(getLocaleFiles);
    const promises = entries.map(async ([locale, files]) => {
        const getFiles = await files;

        const reducedFiles = getFiles.reduce(
            (acc, file) => ({
                ...acc,
                [getPackageName(file)]: path.join(ROOT_GAP, file),
            }),
            {
                empty1: path.join(__dirname, 'empty1.ts'),
                empty2: path.join(__dirname, 'empty2.ts'),
            },
        );

        return [locale, reducedFiles];
    });
    const resultArray = await Promise.all(promises);

    return resultArray.reduce((acc, [locale, files]) => {
        acc[locale] = files;

        return acc;
    }, {});
};

const generateChunks = async () => {
    const getLocaleFiles = await localeFiles;
    const getLocaleInputs = await localeInputs();

    return locales.then((locales) =>
        locales
            .filter(async (locale) => {
                const getLocale = await getLocaleFiles[locale];

                return getLocale.length;
            })
            .map((locale) => ({
                input: getLocaleInputs[locale],
                output: {
                    dir: path.resolve(__dirname, locale, 'src/data'),
                    format: 'es',
                    chunkFileNames: '[name].ts',
                },
                manualChunks: () => 'data',
                plugins: [
                    nodeResolve(),
                    commonjs(),
                    typescript({
                        types: ['node', 'jest'],
                        target: 'es2015',
                        module: 'esnext',
                        exclude: ['**/*.spec.ts', '**/*.stories.ts'],
                        tsconfig: './tsconfig.base.json',
                    }),
                ],
            })),
    );
};

const getPackageName = (path) => {
    return path.split('/')[0];
};

module.exports = () => generateChunks();
