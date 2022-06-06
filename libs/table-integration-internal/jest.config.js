module.exports = {
    displayName: 'table-integration-internal',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table-integration-internal',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
