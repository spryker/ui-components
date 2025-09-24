export default {
    displayName: 'cache',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/cache',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
