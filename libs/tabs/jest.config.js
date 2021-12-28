module.exports = {
  displayName: 'tabs',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/tabs',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
