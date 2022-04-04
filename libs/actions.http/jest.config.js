module.exports = {
  displayName: 'actions.http',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/actions.http',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
