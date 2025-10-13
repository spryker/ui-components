export default {
    displayName: 'table.feature.selectable',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/table.feature.selectable',
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
