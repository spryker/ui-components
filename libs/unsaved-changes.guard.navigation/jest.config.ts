export default {
    displayName: 'unsaved-changes.guard.navigation',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes.guard.navigation',
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
