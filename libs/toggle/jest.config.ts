export default {
    displayName: 'toggle',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/toggle',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
};
