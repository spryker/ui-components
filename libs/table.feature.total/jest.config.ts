/* eslint-disable */
export default {
    displayName: 'table.feature.total',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.total',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
