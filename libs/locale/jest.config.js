module.exports = {
  displayName: 'locale',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/locale',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
