module.exports = {
    displayName: 'unsaved-changes.guard.drawer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes.guard.drawer',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
