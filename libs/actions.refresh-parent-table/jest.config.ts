export default {
    displayName: 'actions.refresh-parent-table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-parent-table',
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
