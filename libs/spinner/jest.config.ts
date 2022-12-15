/* eslint-disable */
export default {
    displayName: 'spinner',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/spinner',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
