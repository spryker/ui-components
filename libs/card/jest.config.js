module.exports = {
    displayName: 'card',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/card',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
