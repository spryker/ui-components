export default {
    displayName: 'table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
