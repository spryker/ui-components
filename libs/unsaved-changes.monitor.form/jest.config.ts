export default {
    displayName: 'unsaved-changes.monitor.form',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes.monitor.form',
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
