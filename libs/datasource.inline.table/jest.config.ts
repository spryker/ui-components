export default {
    displayName: 'datasource.inline.table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.inline.table',
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
