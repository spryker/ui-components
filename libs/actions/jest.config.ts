export default {
    displayName: 'actions',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
