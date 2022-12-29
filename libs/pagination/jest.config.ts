/* eslint-disable */
export default {
    displayName: 'pagination',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/pagination',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
