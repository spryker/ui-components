const { execSync } = require('child_process');
const { resolve } = require('path');

const IGNORE_TAGS = ['type:meta'];
const ROOT_DIR = resolve(__dirname, '../..');

/**
 * Spawns a command with all buildable projects from `angular.json`
 * that do not have tags specified in {@link IGNORE_TAGS}
 *
 * ```
 *  npx nx run-many --target build --projects [...projects]
 * ```
 * @param {string[]} extraArgs Extra args to pass to the NX build command
 */
async function main(extraArgs) {
    const { globbySync } = await import('globby');
    const projectsJson = globbySync('libs/**/project.json', {
        cwd: ROOT_DIR,
        expandDirectories: {
            files: ['project'],
            extensions: ['json'],
        },
    });
    const projects = await Promise.all(
        projectsJson.map((path) =>
            import(resolve(ROOT_DIR, path), { with: { type: 'json' } }).then((data) => data.default),
        ),
    );

    /** @type {Record<string, boolean>} */
    const ignoreMap = IGNORE_TAGS.reduce((acc, tag) => ({ ...acc, [tag]: true }), {});

    const projectsToBuild = projects.filter((p) => p.tags && p.tags.every((tag) => !ignoreMap[tag])).map((p) => p.name);

    console.log(`Building projects: ${projectsToBuild.join(', ')}...`);

    const args = ['--target build', `--projects ${projectsToBuild.join(',')}`, ...extraArgs];

    execSync(`npx nx run-many ${args.join(' ')}`, { stdio: 'inherit' });
}

main(process.argv.slice(2)).catch((e) => {
    console.error(e);
    process.exit(1);
});
