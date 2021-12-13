module.exports = {
  displayName: 'html-renderer',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/html-renderer',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
