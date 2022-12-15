/* eslint-disable */
export default {
    displayName: 'unsaved-changes.monitor.form',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/unsaved-changes.monitor.form',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
};
