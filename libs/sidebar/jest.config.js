module.exports = {
    displayName: 'sidebar',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/sidebar',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
