/* eslint-disable */
export default {
    displayName: 'data-transformer.chain',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.chain',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
