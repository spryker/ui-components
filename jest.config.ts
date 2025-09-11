const collectCoverage = process.env.COVERAGE !== undefined;
const { getJestProjectsAsync } = require('@nx/jest');

export default async () => ({
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)
: 'ts-jest',
        '^.+\\.mdx
: '@storybook/addon-docs/jest-transform-mdx',
    },
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverage,
    collectCoverageFrom: ['src/**/*.ts', '!**/*.stories.ts', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text'],
    passWithNoTests: true,
    projects: await getJestProjectsAsync(),
});
