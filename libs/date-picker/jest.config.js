module.exports = {
  displayName: 'date-picker',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/date-picker',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
