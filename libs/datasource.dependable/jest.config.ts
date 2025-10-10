export default {
    displayName: 'datasource.dependable',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.dependable',
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
