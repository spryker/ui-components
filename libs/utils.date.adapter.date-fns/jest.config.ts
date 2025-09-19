export default {
    displayName: 'utils.date.adapter.date-fns',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/utils.date.adapter.date-fns',
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
