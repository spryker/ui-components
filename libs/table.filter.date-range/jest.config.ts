export default {
    displayName: 'table.filter.date-range',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.filter.date-range',
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
