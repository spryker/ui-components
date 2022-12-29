export default {
    displayName: 'datasource.inline.table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.inline.table',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
