export default {
    displayName: 'table.feature.editable',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.editable',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
