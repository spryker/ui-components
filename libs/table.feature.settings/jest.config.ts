export default {
    displayName: 'table.feature.settings',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.settings',
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
