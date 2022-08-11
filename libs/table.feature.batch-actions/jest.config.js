module.exports = {
    displayName: 'table.feature.batch-actions',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.batch-actions',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
