export default {
    displayName: 'actions.refresh-modal',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-modal',
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
