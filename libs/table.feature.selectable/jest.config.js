module.exports = {
    displayName: 'table.feature.selectable',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.selectable',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
