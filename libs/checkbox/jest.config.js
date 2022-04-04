module.exports = {
  displayName: 'checkbox',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/checkbox',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
