module.exports = {
    displayName: 'table.feature.search',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.search',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
