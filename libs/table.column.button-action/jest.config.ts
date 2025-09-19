export default {
    displayName: 'table.column.button-action',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.button-action',
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
