export default {
    displayName: 'datasource.trigger.input',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.trigger.input',
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
