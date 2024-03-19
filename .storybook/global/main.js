const rootMain = require('../main');

module.exports = {
    ...rootMain,
    stories: rootMain.stories.map((path) => `../${path}`),
    webpackFinal: async (config, { configType }) => {
        // apply any global webpack configs that might have been specified in .storybook/main.js
        if (rootMain.webpackFinal) {
            config = await rootMain.webpackFinal(config, { configType });
        }

        // add your own webpack tweaks if needed

        return config;
    },
};
