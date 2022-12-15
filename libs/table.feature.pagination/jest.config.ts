/* eslint-disable */
export default {
    displayName: 'table.feature.pagination',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.pagination',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
