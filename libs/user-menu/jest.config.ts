/* eslint-disable */
export default {
    displayName: 'user-menu',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/user-menu',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
