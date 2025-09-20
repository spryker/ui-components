export default {
    displayName: 'data-transformer.date-serialize',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.date-serialize',
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
