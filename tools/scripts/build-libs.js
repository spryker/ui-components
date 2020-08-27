const { execSync } = require('child_process');

const projects = require('../../nx.json').projects;

const EXCLUDED_TAGS = ['type:meta'];

async function main(args) {
  const projectsToBuild = Object.entries(projects)
    .filter(
      ([_, p]) => p.tags && !p.tags.some(tag => EXCLUDED_TAGS.includes(tag)),
    )
    .map(([name]) => name);

  console.log(`Building projects: ${projectsToBuild.join(', ')}...`);

  execSync(
    `npx nx run-many --target build --with-deps ${args.join(
      ' ',
    )} --projects ${projectsToBuild.join(',')}`,
    { stdio: 'inherit' },
  );
}

main(process.argv.slice(2)).catch(e => {
  console.error(e);
  process.exit(1);
});
