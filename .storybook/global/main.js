const config = require('../main');

module.exports = {
  ...config,
  stories: config.stories.map((path) => `../${path}`),
};
