const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const packagePath = path.resolve(cwd, 'package.json');
const packageDistPath = path.resolve(cwd, 'dist/package.json');

console.log(`Updating version from ${packagePath} to ${packageDistPath}`);

try {
  fs.statSync(packageDistPath);
} catch (e) {
  console.log(`No package.json in dist folder found! Skipping...`);
}

const packageVersion = require(packagePath).version;
const packageDist = require(packageDistPath);

packageDist.version = packageVersion;

fs.writeFileSync(packageDistPath, JSON.stringify(packageDist, null, 2));
