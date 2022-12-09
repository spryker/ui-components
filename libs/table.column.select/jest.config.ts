/* eslint-disable */
export default {
    displayName: 'table.column.select',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.select',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};