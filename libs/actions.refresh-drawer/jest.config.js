module.exports = {
    displayName: 'actions.refresh-drawer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-drawer',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
