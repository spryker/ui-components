module.exports = {
    displayName: 'datasource.inline',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.inline',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
