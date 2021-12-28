module.exports = {
  displayName: 'styles',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/styles',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
