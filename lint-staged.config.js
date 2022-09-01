module.exports = {
    '*.{jsx?,tsx?,json,s?css,less,html}': (files) => [`npm run format:write -- --files ${files.join(',')}`],
    '{libs,apps}/**/*.{tsx?,jsx?}': (files) => [`npm run affected:lint -- --fix --files ${files.join(',')}`],
    '{libs,apps}/**/*.{tsx?,jsx?}': (files) => [`npm run affected:test -- --files ${files.join(',')}`],
};
