export default {
    displayName: 'input',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/input',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
