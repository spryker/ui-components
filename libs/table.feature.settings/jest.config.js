module.exports = {
    displayName: 'table.feature.settings',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.settings',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
