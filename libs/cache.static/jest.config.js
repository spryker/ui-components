module.exports = {
    displayName: 'cache.static',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/cache.static',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
