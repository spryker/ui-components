/* eslint-disable */
export default {
    displayName: 'data-transformer.array-map',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.array-map',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
