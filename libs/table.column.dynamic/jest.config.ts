export default {
    displayName: 'table.column.dynamic',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.column.dynamic',
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
