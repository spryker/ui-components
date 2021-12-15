module.exports = {
  stories: ['../**/*.stories.@(ts|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    'storybook-addons-abstract',
  ],
  core: {
    builder: 'webpack5',
  },
};
