module.exports = {
    displayName: 'navigation',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/navigation',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
