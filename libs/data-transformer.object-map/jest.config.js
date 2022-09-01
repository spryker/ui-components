module.exports = {
    displayName: 'data-transformer.object-map',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.object-map',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
