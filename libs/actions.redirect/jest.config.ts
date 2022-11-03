/* eslint-disable */
export default {
    displayName: 'actions.redirect',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.redirect',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
