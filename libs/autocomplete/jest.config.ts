export default {
    displayName: 'autocomplete',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/autocomplete',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
