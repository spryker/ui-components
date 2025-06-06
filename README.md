# Spryker

> UI Components powered by Angular and Ant Design

## Component Development

All components should have their own `NgModule` where they are declared and all dependencies imported.

Main development should be done via Storybook.

All component behavior from Tech Specs must be unit tested.

### Component styles

Main component styles should be in `<component-name>.component.less` file.

Optionally component may have theme styles that include Ant Design specific files
with customized theme from `libs/styles/src/lib/themes/default/theme.less`
and file should be named `<component-name>.component.theme.less`.

### Commands

#### Build library

```bash
nx build <lib-name>
```

#### Test library

_NOTE:_ Before running any tests - make sure to cleanup `dist` folder!

```bash
nx test <lib-name>
```

#### Lint library

```bash
nx lint <lib-name>
```

#### Lint styles

```bash
npm run stylelint
```

#### Storybook

_NOTE:_ Before running any storybooks - make sure to cleanup libs from `dist` folder!

Serve:

```bash
nx run <lib-name>:storybook
```

Build:

```bash
nx run <lib-name>:build-storybook
```

#### Global Storybook

_NOTE:_ Before running any storybooks - make sure to cleanup libs from `dist` folder!

Serve:

```bash
nx run storybook:serve
```

Build:

```bash
nx run storybook:compile
```

## Component Levels

All components are classified according to Atomic Design into the following (form lowest to highest):

1. Atom
2. Molecule
3. Organism

_NOTE:_ Components with lower level cannot depend on components with higher level.

For this every component library should have associated ONE level tag:

1. `level:atom`
2. `level:molecule`
3. `level:organism`

## Available Tags

-   `type:*` Describes the library type
    -   `type:component-service` Component with service library
    -   `type:component` Component library
    -   `type:service` Services library
    -   `type:style` Styles library
    -   `type:util` Helper utilities library
    -   `type:meta` Meta package that does not get deployed to NPM (internal infra)
-   `level:*` Describes the component type according to the Atomic Design framework
    -   `level:atom`
    -   `level:molecule`
    -   `level:organism`
-   `pkg:*` Describes the package type
    -   `pkg:primary`
    -   `pkg:extension`

## Code generation

### Library

Every new library should be generated via NX CLI with `@nx/angular:library` schematic:

```bash
nx g @nx/angular:library <lib-name> --publishable --import-path @spryker/<lib-name> --tags level:<level>,type:<type>,pkg:<pkg>
```

_NOTE:_ When library is generated please do the following:

-   In `tsconfig.base.json`
    -   remove newly generated path `paths[@spryker/<lib-name>]`:
    ```json
        "paths": {
            - "@spryker/<lib-name>": [
                "libs/<lib-name>/src/index.ts"
            ]
        }
    ```
-   In `tsconfig.json`
    -   add the following to the `references`:
    ```json
        {
            "path": "./libs/<lib-name>/tsconfig.json"
        },
    ```
-   In `libs/<lib-name>/.eslintrc.json`
    -   remove following section:
    ```json
        "extends": [
            "plugin:@nrwl/nx/angular",
            "plugin:@angular-eslint/template/process-inline-templates"
        ],
    ```
-   In `libs/<lib-name>/jest.config.ts`
    -   remove following sections:
    ```json
        "transform": { ... },
        "transformIgnorePatterns": [ ... ],
        "snapshotSerializers": [ ... ]
    ```
    -   add the following `globals`
    ```json
        globals: {
            'ts-jest': {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        },
    ```
-   In `libs/<lib-name>/ng-package.json`
    -   add `styleIncludePaths` to `lib` for theme imports (if needed):
    ```json
        "lib": {
            ...,
            "styleIncludePaths": ["../styles/src/lib"]
        }
    ```
-   In `libs/<lib-name>/package.json`
    -   add `publishConfig` prop with `access=public` value:
    ```json
        "publishConfig": {
            "access": "public"
        },
    ```
-   In `libs/<lib-name>/tsconfig.json`
    -   remove following sections:
    ```json
        "compilerOptions": { ... },
        "angularCompilerOptions": { ... }
    ```
    -   add reference to prod config
    ```json
        "references": [
            ...,
            {
                "path": "./tsconfig.lib.prod.json"
            },
        ]
    ```
-   In `libs/<lib-name>/tsconfig.lib.prod.json`
    -   remove following section:
    ```json
        "angularCompilerOptions": {
            "compilationMode": "partial"
       }
    ```
-   In `lib/<lib-name>/src/test-setup.ts`
    -   add global setup import:
    ```ts
    import '../../../config/test-setup';
    ```
-   In `lib/<lib-name>/src/project.json`
    -   add `styles` as `implicitDependencies`
    ```json
        "implicitDependencies": ["styles"],
    ```

### Component

Every new component should be generated via NX CLI with `@schematics/angular:component` schematic:

```bash
nx g @schematics/angular:component --name=<component-name> --project=<lib-name>
```

### Storybook Setup

Storybook setup should be added via NX CLI with `@nx/storybook:configuration` schematic:

```bash
nx g @nx/storybook:configuration --name=<lib-name>
```

_NOTE:_ Do the following updates after command above:

-   In `<lib-name>/.storybook/tsconfig.json`:
    -   replace `"include"` array with (add `"../../locale/data/**/src/index.ts"` to array if using localization):
    ```json
        "include": ["../src/**/*", "*.js"]
    ```
-   Change extension from `*.ts` into `*.js` for all files in the `<lib-name>/.storybook` folder
-   Add `import '../../../.storybook/preview';` to the `<lib-name>/.storybook/preview.js`
-   In `<lib-name>/.storybook/main.js`:

    -   Replace the whole:

        ```json
            const rootMain = require('../../../.storybook/main');

            module.exports = {
                ...rootMain,

                webpackFinal: async (config, { configType }) => {
                    // apply any global webpack configs that might have been specified in .storybook/main.js
                    if (rootMain.webpackFinal) {
                        config = await rootMain.webpackFinal(config, { configType });
                    }

                    // add your own webpack tweaks if needed

                    return config;
                },

                stories: ['../**/*.@(mdx|stories.@(ts))'],
            };
        ```

-   In `libs/<lib-name>/tsconfig.json`:
    -   add reference to prod config
    ```json
        "references": [
            ...,
            {
                "path": "./.storybook/tsconfig.json"
            },
        ]
    ```
-   In `lib/<lib-name>/src/project.json`
    -   add new configs for `targets` section
    ```json
        "targets": {
            ...,
             "storybook": {
                "executor": "@storybook/angular:start-storybook",
                "options": {
                    "port": 4400,
                    "configDir": "libs/<lib-name>/.storybook",
                    "browserTarget": "<lib-name>:build-storybook",
                    "compodoc": true,
                    "compodocArgs": ["-e", "json", "-d", "dist"],
                    "enableProdMode": false,
                    "styles": [".storybook/styles.less"]
                },
                "configurations": {
                    "ci": {
                        "quiet": true
                    }
                }
            },
            "build-storybook": {
                "executor": "@storybook/angular:build-storybook",
                "outputs": ["{options.outputPath}"],
                "options": {
                    "outputDir": "dist/storybook/<lib-name>",
                    "configDir": "libs/<lib-name>/.storybook",
                    "browserTarget": "<lib-name>:build-storybook",
                    "compodoc": true,
                    "compodocArgs": ["-e", "json", "-d", "dist"],
                    "enableProdMode": false,
                    "styles": [".storybook/styles.less"]
                },
                "configurations": {
                    "ci": {
                        "quiet": true
                    }
                }
            },
        },
    ```

### Library Stories

Generate stories for library module via NX CLI with `@nx/angular:stories` schematic:

```bash
nx g @nx/angular:stories --name=<lib-name>
```

_NOTE_: `NgModule`s of the library should declare components for which stories should be generated.  
This command can be re-run many times - it will only generate missing stories and keep existing ones untouched.

### Component Stories

Generate stories for components via NX CLI with `@nx/angular:component-story` schematic:

```bash
nx g @nx/angular:component-story --project-path libs/<lib-name> --component-path src/lib/<lib-name> --component-name <ComponentName> --component-file-name <name.component>
```

## Localisation / I18N

The localization is provided from each package directly for the package.

The location of i18n files are in: `libs/<lib-name>/src/i18n/`.

Then each specific language is placed in its own file (ex. `en.ts` or `de.ts`)
and MUST default export an interface [`I18nLocaleDataPackage`](libs/locale/src/lib/i18n/types.ts#L10) from package `locale`.

All the i18n files are then aggregated into a main package `locale` during a build phase.

### Publishing

As all separate i18n files are aggregated in single `locale` package
it's important to understand how to release it correctly
(read about [Release process](#release-process)).

The changes in separate i18n files will **only** trigger publishing of their package
but the main `locale` package will not be published.

In order to publish `locale` package - go to it's
[main entry point file](libs/locale/src/index.ts)
and update the `Locale Version` number in the comment at the top.

## Commits

All commit messages should follow [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/#specification).

To perform commit you can use a tool that replaces `git commit` command - `npm run ct`/`yarn ct`.

## Code formatting

All project files are formatted via `prettier`.

To perform full project format run:

```bash
npm run format
```

To perform format check run:

```bash
npm run format:check
```

## Release process

Releasing and versioning is done fully automatic using [`lerna`](https://github.com/lerna/lerna).

This is the reason why commits according to conventional changelog is crucial.

All releases are done by merging/pushing to release branches via Travis CI.

During the release:

-   git tags are created
-   package versions updated
-   package changelogs updated
-   packages published to NPM registry

These are the release branches (`git branch` => `@npm tag`):

-   `master` => `@latest`
-   `next` => `@next`
-   `beta` => `@beta`
-   `alpha` => `@alpha`
-   `rc` => `@rc`

### Release Recovery

#### NPM

Sometimes publishing to NPM may fail due to several reasons:

-   NPM services experience outages
-   Configuration of certain packages prevent them from being published by NPM
    (ex. public access is not explicitly set)

This may result in some or all packages not published even when version
and changelogs were updated and pushed back to git.

In this case you need to:

1. Make sure that the issue that prevented packages from publishing is resolved
2. Merge the branch that failed into related `recovery` branch (add to name prefix `republish/`)

**Recovery branches for republishing:**

-   `master` => `republish/master`
-   `next` => `republish/next`
-   `beta` => `republish/beta`
-   `alpha` => `republish/alpha`
-   `rc` => `republish/rc`

After branch is pushed to CI it will attempt to find unpublished packages in NPM
and try to publish them again with the same versions.

---

## Documentation

-   [Nx](https://nx.dev/angular)
-   [Angular](https://angular.io/docs)
-   [RxJs](https://rxjs.dev/guide/overview)
-   [Ant Design](https://ng.ant.design/docs/introduce/en)
-   [UI Components](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/marketplace/marketplace-frontend.html)

## Contributing to the repository

For contribution guidelines, see [Code contribution guide](https://github.com/spryker/ui-components/blob/master/CONTRIBUTING.md).
