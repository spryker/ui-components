const path = require('path');
const copyfiles = require('copyfiles');

const cwd = process.cwd();
const libName = path.basename(cwd);

const source = `../../dist/libs/${libName}/**/*`;
const dest = `./dist`;

console.log(`Copying lib ${libName} from ${source} into ${dest}...`);

copyfiles([source, dest], { up: 5 }, err => {
  if (err) {
    console.error(`Failed to copy lib ${libName}: ${err}`);
    process.exit(1);
  }
});
