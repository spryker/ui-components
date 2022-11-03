/* eslint-disable */
export default {
    displayName: 'drawer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/drawer',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
