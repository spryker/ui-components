module.exports = {
  displayName: 'ajax-form',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ajax-form',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
