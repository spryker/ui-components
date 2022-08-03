module.exports = {
  displayName: 'table.filter.date-range',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/table.filter.date-range',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
