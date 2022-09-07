module.exports = {
    displayName: 'unsaved-changes.guard.browser',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes.guard.browser',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
