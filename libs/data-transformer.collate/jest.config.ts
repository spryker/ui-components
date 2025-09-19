export default {
    displayName: 'data-transformer.collate',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.collate',
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
