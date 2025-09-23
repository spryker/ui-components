const collectCoverage = process.env.COVERAGE !== undefined;

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/*.stories.ts',
    '!**/node_modules/**',
  ],
  coverageReporters: ['lcov', 'text'],
  passWithNoTests: true,
  testPathIgnorePatterns: [
    'libs/table.feature.title',
    'table.feature.total',
    'table.feature.search',
    'table.feature.filters',
    'table.feature.sync-state',
    'table.feature.selectable',
    'table.feature.pagination',
    'table.feature.batch-actions',
  ],
};
