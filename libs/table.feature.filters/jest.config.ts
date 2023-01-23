export default {
    displayName: 'table.feature.filters',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.filters',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
