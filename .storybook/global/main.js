import rootMain from '../main.js';

export default {
    ...rootMain,
    stories: ['../../**/*.@(mdx|stories.@(ts))'],
    webpackFinal: async (config, { configType }) => {
        // apply any global webpack configs that might have been specified in .storybook/main.js
        if (rootMain.webpackFinal) {
            config = await rootMain.webpackFinal(config, { configType });
        }

        // add your own webpack tweaks if needed

        return config;
    },
};
