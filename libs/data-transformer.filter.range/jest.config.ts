/* eslint-disable */
export default {
    displayName: 'data-transformer.filter.range',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.filter.range',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
