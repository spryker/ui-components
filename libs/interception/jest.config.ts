export default {
    displayName: 'interception',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/interception',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
