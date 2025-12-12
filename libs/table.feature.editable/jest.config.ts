export default {
    displayName: 'table.feature.editable',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.editable',
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
