const path = require('path');

const packageName = process.env.LERNA_PACKAGE_NAME;
const cwd = process.cwd();
const libName = path.basename(cwd);

console.log(`Linting lib ${libName} (${packageName})...`);

module.exports = {
  'src/**/*.{tsx?,jsx?}': [`ng lint ${libName} --fix --files`],
  'src/**/*.ts': [
    `node ../../tools/scripts/space-to-comma.js ng test ${libName} --bail 1 --findRelatedTests --`,
  ],
};
