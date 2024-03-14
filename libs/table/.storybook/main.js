const rootMain = require('../../../.storybook/main');

module.exports = {
    ...rootMain,

    webpackFinal: async (config, { configType }) => {
        // apply any global webpack configs that might have been specified in .storybook/main.js
        if (rootMain.webpackFinal) {
            config = await rootMain.webpackFinal(config, { configType });
        }

        // add your own webpack tweaks if needed

        return config;
    },

    stories: ['../**/*.@(mdx|stories.@(ts))']
};
