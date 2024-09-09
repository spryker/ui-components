export default {
    displayName: 'select',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/select',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
