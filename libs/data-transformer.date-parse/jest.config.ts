export default {
    displayName: 'data-transformer.date-parse',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.date-parse',
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
