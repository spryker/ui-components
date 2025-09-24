export default {
    displayName: 'table.feature.row-actions',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.row-actions',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
