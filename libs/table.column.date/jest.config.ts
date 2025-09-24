export default {
    displayName: 'table.column.date',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.date',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
