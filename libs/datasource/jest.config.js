module.exports = {
  displayName: 'datasource',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/datasource',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
