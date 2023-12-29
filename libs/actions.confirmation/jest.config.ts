export default {
    displayName: 'actions.confirmation',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.confirmation',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
