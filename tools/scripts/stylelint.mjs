import { program } from 'commander';
import path from 'path';
import stylelint from 'stylelint';
import { fileURLToPath } from 'url';

program
    .option('-f, --fix', 'execute stylelint in the fix mode.')
    .option('-p, --file-path <path>', 'execute stylelint only for this file.')
    .parse();

const options = program.opts();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');
const defaultFilePaths = [`${root}/libs/**/*.less`];
const filePaths = options.filePath ? [options.filePath] : defaultFilePaths;

stylelint
    .lint({
        configFile: `${root}/.stylelintrc.js`,
        files: filePaths,
        formatter: 'string',
        fix: !!options.fix,
    })
    .then(function (data) {
        if (data.errored) {
            const messages = JSON.parse(JSON.stringify(data.report));

            process.stdout.write(messages);
            process.exit(1);
        }
    })
    .catch(function (error) {
        console.error(error.stack);
        process.exit(1);
    });
