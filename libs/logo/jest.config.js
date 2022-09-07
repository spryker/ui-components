module.exports = {
    displayName: 'logo',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/logo',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
