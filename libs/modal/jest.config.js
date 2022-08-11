module.exports = {
    displayName: 'modal',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/modal',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
