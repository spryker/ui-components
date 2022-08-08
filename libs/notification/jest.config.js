module.exports = {
  displayName: 'notification',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/notification',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
