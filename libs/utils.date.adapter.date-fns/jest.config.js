module.exports = {
  displayName: 'utils.date.adapter.date-fns',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/utils.date.adapter.date-fns',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
