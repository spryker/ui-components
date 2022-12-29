export default {
    displayName: 'header',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/header',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
