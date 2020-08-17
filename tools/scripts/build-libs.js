const { execSync } = require('child_process');

const projects = require('../../nx.json').projects;

async function main(args) {
  const projectsToBuild = Object.entries(projects)
    .filter(([_, p]) => p.tags && !p.tags.includes('type:meta'))
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
