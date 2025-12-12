export default {
    displayName: 'data-transformer.object-map',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/data-transformer.object-map',
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
