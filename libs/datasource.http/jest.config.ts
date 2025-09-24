export default {
    displayName: 'datasource.http',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.http',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
