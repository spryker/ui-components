export default {
    displayName: 'actions.refresh-drawer',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-drawer',
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
