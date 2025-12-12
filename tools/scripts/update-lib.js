const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const copyfiles = require('copyfiles');
const { globby } = require('globby');

const fsStat = promisify(fs.stat);
const fsWriteFile = promisify(fs.writeFile);
const fsReadFile = promisify(fs.readFile);
const copyfilesAsync = promisify(copyfiles);

const cwd = process.cwd();
const rootPath = path.resolve(cwd, '../..');

const tasks = [updatePackage(cwd), updateChangelog(cwd), updateInternalDependencies(cwd)];

Promise.all(tasks).catch((err) => {
    console.error(err);
    process.exit(1);
});

async function updatePackage(libPath) {
    const packagePath = path.resolve(libPath, 'package.json');
    const packageDistPath = path.resolve(libPath, 'dist/package.json');

    console.info(`Updating package from ${packagePath} to ${packageDistPath}`);

    try {
        await fsStat(packageDistPath);
    } catch (e) {
        console.info(`No package.json in dist folder found! Skipping...`);
        return;
    }

    const package = require(packagePath);
    const packageDist = require(packageDistPath);

    packageDist.version = package.version;
    packageDist.dependencies = package.dependencies;

    await fsWriteFile(packageDistPath, JSON.stringify(packageDist, null, 2));
}

async function updateChangelog(libPath) {
    const changelogName = 'CHANGELOG.md';
    const changelogDistPath = 'dist';

    console.info(`Updating changelog from ${changelogName} to ${changelogDistPath}`);

    await copyfilesAsync([changelogName, changelogDistPath]);
}

async function updateInternalDependencies(libPath) {
    console.info(`Updating internal dependencies for ${libPath}`);

    try {
        const packageVersionMap = await getPackageVersionMap();
        const distPackagePath = path.resolve(libPath, 'dist/package.json');

        await updateDependenciesInFile(path.resolve(libPath, 'package.json'), packageVersionMap);

        try {
            await fsStat(distPackagePath);
            await updateDependenciesInFile(distPackagePath, packageVersionMap);
        } catch (e) {
            console.info(`No package.json in dist folder found! Skipping...`);
        }
    } catch (error) {
        console.warn(`Failed to update internal dependencies: ${error.message}`);
    }
}

async function getPackageVersionMap() {
    const packageVersionMap = new Map();

    const libsPath = path.resolve(rootPath, 'libs');
    const packageJsonFiles = await globby('*/package.json', { cwd: libsPath });

    for (const file of packageJsonFiles) {
        try {
            const fullPath = path.resolve(libsPath, file);
            const content = await fsReadFile(fullPath, 'utf8');
            const packageJson = JSON.parse(content);

            if (packageJson.name && packageJson.name.startsWith('@spryker/')) {
                packageVersionMap.set(packageJson.name, packageJson.version);
            }
        } catch (error) {
            console.warn(`Failed to read ${file}: ${error.message}`);
        }
    }

    console.info(`Found ${packageVersionMap.size} @spryker packages for version mapping`);
    return packageVersionMap;
}

async function updateDependenciesInFile(filePath, packageVersionMap) {
    try {
        const content = await fsReadFile(filePath, 'utf8');
        const packageJson = JSON.parse(content);
        let hasChanges = false;

        if (packageJson.dependencies) {
            hasChanges = updateDependencySection(packageJson.dependencies, packageVersionMap) || hasChanges;
        }

        if (packageJson.peerDependencies) {
            hasChanges = updateDependencySection(packageJson.peerDependencies, packageVersionMap) || hasChanges;
        }

        if (packageJson.devDependencies) {
            hasChanges = updateDependencySection(packageJson.devDependencies, packageVersionMap) || hasChanges;
        }

        if (hasChanges) {
            await fsWriteFile(filePath, JSON.stringify(packageJson, null, 4) + '\n');
            console.info(`Updated internal dependencies in ${filePath}`);
        }
    } catch (error) {
        console.warn(`Failed to update dependencies in ${filePath}: ${error.message}`);
    }
}

function updateDependencySection(dependencies, packageVersionMap) {
    let hasChanges = false;

    for (const [depName, currentVersion] of Object.entries(dependencies)) {
        if (depName.startsWith('@spryker/') && packageVersionMap.has(depName)) {
            const newVersion = packageVersionMap.get(depName);
            const newVersionRange = `^${newVersion}`;

            if (currentVersion !== newVersionRange) {
                console.info(`  ${depName}: ${currentVersion} -> ${newVersionRange}`);
                dependencies[depName] = newVersionRange;
                hasChanges = true;
            }
        }
    }

    return hasChanges;
}
