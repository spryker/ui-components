module.exports = {
  displayName: 'radio',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/radio',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
