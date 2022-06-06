module.exports = {
    displayName: 'data-transformer.filter.equals',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.filter.equals',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
