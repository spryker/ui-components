export default {
    displayName: 'button.icon',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/button.icon',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
