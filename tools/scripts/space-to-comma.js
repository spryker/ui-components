/**
 * Execute command but concatenate arguments after `--` with commas
 *
 * @example:
 * When calling:
 *  $ node space-to-comma.js some command arg1 arg2 -- arg3 arg4 arg5
 * Will execute:
 *  $ some command arg1 arg2 arg3,arg4,arg5
 */

const { execSync } = require('child_process');

const { commands, args } = splitArgs(process.argv.slice(2));

console.info({ commands, args });

const argsWithCommas = args.join(',');

console.info({ argsWithCommas });

const command = `${commands.join(' ')} ${argsWithCommas}`;

console.info({ command });

execSync(command, { stdio: 'inherit', env: process.env });

function splitArgs(argsList, separator = '--') {
    let separatorFound = false;

    const beforeReducer = (stash, arg) => {
        if (!separatorFound && arg === separator) {
            reducer = afterReducer;
            return;
        }

        stash.commands.push(arg);
    };

    const afterReducer = (stash, arg) => stash.args.push(arg);

    let reducer = beforeReducer;

    return argsList.reduce(
        (stash, arg) => {
            reducer(stash, arg);
            return stash;
        },
        {
            commands: [],
            args: [],
        },
    );
}
