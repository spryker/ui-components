module.exports = {
  displayName: 'table.column.input',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/table.column.input',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
