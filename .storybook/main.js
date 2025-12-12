const path = require('path');
module.exports = {
    stories: ['../**/*.@(mdx|stories.@(ts))'],

    addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs'],

    core: {
        disableTelemetry: true,
    },

    framework: {
        name: '@storybook/angular',
        options: {},
    },

    webpackFinal: async (config, { configType }) => {
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];

        // Extract LESS rule
        const lessRule = config.module.rules.find((rule) => rule.test.toString().endsWith('/\\.(?:less)$/i'));

        // Extract LESS loader
        const lessLoader = lessRule.rules.find((rule) => rule.use).use.find((l) => l.loader.includes('less-loader'));

        // Add paths to activate default LESS resolution
        lessLoader.options.lessOptions = lessLoader.options.lessOptions || {};
        lessLoader.options.lessOptions.paths = [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../libs/styles/src/lib'),
        ];
        return config;
    },
};
