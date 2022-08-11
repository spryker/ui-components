module.exports = {
    displayName: 'data-transformer.filter.text',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.filter.text',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
