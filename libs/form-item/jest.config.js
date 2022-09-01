module.exports = {
    displayName: 'form-item',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/form-item',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
