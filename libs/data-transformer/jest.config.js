module.exports = {
    displayName: 'data-transformer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
