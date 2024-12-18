const collectCoverage = process.env.COVERAGE !== undefined;
const { getJestProjects } = require('@nx/jest');

export default {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest',
        '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    },
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverage,
    collectCoverageFrom: ['src/**/*.ts', '!**/*.stories.ts', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text'],
    passWithNoTests: true,
    projects: getJestProjects(),
};
