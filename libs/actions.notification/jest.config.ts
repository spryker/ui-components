export default {
    displayName: 'actions.notification',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.notification',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
