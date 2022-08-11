module.exports = {
    displayName: 'popover',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/popover',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
