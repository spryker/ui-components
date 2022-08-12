module.exports = {
    displayName: 'unsaved-changes',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
