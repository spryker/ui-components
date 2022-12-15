/* eslint-disable */
export default {
    displayName: 'label',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/label',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
