export default {
    displayName: 'datasource.trigger',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.trigger',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
