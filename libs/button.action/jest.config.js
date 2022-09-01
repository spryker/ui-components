module.exports = {
    displayName: 'button.action',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/button.action',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
