module.exports = {
    displayName: 'table.feature.sync-state',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.sync-state',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
