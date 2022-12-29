/* eslint-disable */
export default {
    displayName: 'ajax-action',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/ajax-action',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
