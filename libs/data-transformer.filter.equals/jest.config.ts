export default {
    displayName: 'data-transformer.filter.equals',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.filter.equals',
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
