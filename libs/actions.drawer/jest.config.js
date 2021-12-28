module.exports = {
  displayName: 'actions.drawer',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/actions.drawer',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
