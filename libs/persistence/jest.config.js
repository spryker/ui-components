module.exports = {
  displayName: 'persistence',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/persistence',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
