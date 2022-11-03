/* eslint-disable */
export default {
    displayName: 'button',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/button',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
