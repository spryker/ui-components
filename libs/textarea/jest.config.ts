/* eslint-disable */
export default {
    displayName: 'textarea',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/textarea',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
