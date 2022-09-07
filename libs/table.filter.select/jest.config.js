module.exports = {
    displayName: 'table.filter.select',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.filter.select',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
