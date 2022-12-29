export default {
    displayName: 'input.password',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/input.password',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
