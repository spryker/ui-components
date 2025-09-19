export default {
    displayName: 'table-integration-internal',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table-integration-internal',
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
