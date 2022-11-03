/* eslint-disable */
export default {
    displayName: 'data-transformer.date-parse',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.date-parse',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
