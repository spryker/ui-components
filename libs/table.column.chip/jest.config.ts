export default {
    displayName: 'table.column.chip',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.chip',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
