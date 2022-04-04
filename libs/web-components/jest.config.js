module.exports = {
  displayName: 'web-components',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/web-components',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
