module.exports = {
    displayName: 'utils',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/utils',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
