export default {
    displayName: 'datasource.trigger.change',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/datasource.trigger.change',
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
