export default {
    displayName: 'collapsible',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/collapsible',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
