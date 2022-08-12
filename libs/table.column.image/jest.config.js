module.exports = {
    displayName: 'table.column.image',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.image',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
