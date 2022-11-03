/* eslint-disable */
export default {
    displayName: 'actions.refresh-parent-table',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/actions.refresh-parent-table',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
