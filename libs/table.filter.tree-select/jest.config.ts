/* eslint-disable */
export default {
    displayName: 'table.filter.tree-select',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.filter.tree-select',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
