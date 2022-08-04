module.exports = {
  displayName: 'data-transformer.configurator.table',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/data-transformer.configurator.table',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
