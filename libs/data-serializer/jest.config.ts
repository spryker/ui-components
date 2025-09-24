export default {
    displayName: 'data-serializer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-serializer',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
