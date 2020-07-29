const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const copyfiles = require('copyfiles');

const fsStat = promisify(fs.stat);
const fsWriteFile = promisify(fs.writeFile);
const copyfilesAsync = promisify(copyfiles);

const cwd = process.cwd();

const tasks = [updateVersion(cwd), updateChangelog(cwd)];

Promise.all(tasks).catch(err => {
  console.error(err);
  process.exit(1);
});

async function updateVersion(libPath) {
  const packagePath = path.resolve(libPath, 'package.json');
  const packageDistPath = path.resolve(libPath, 'dist/package.json');

  console.log(`Updating version from ${packagePath} to ${packageDistPath}`);

  try {
    await fsStat(packageDistPath);
  } catch (e) {
    console.log(`No package.json in dist folder found! Skipping...`);
    return;
  }

  const packageVersion = require(packagePath).version;
  const packageDist = require(packageDistPath);

  packageDist.version = packageVersion;

  await fsWriteFile(packageDistPath, JSON.stringify(packageDist, null, 2));
}

async function updateChangelog(libPath) {
  const changelogName = 'CHANGELOG.md';
  const changelogDistPath = 'dist';

  console.log(
    `Updating changelog from ${changelogName} to ${changelogDistPath}`,
  );

  await copyfilesAsync([changelogName, changelogDistPath]);
}
