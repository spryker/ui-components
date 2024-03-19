export default {
    displayName: 'actions.refresh-table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-table',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
