module.exports = {
    '*.{js?(x),ts?(x),json,css,less,html}': (files) => [`npm run format -- --files ${files.join(',')}`],
    '{libs,apps}/**/*.{ts?(x),js?(x)}': (files) => [
        `npm run affected:lint -- --fix --files ${files.join(',')}`,
        `npm run affected:test -- --files ${files.join(',')}`,
    ],
};
