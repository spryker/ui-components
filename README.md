# Spryker

> UI Components powered by Angular and Ant Design

## Packages

| Name                  | Package Name      |
| --------------------- | ----------------- |
| [core](libs/core)     | `@spryker/core`   |
| [styles](libs/styles) | `@spryker/styles` |
|                       |                   |

## Component Development

All components should have their own `NgModule` where they are declared and all dependencies imported.

Main development should be done via Storybook.

All component behavior from Tech Specs must be unit tested.

### Component styles

Main component styles should be in `<my-component>.component.less` file.

Optionally component may have theme styles that include Ant Design specific files
with customized theme from `libs/styles/src/lib/themes/default/theme.less`
and file should be named `<my-component>.component.theme.less`.

### Commands

#### Build library

```bash
nx build <my-lib>
```

#### Test library

_NOTE:_ Before running any tests - make sure to cleanup `dist` folder!

```bash
nx test <my-lib>
```

#### Lint library

```bash
nx lint <my-lib>
```

#### Storybook

_NOTE:_ Before running any storybooks - make sure to cleanup libs from `dist` folder
and have meta build generated via `npm run build-meta`!

Serve:

```bash
nx run <my-lib>:storybook
```

Build:

```bash
nx run <my-lib>:build-storybook
```

#### Global Storybook

_NOTE:_ Before running any storybooks - make sure to cleanup libs from `dist` folder
and have meta build generated via `npm run build-meta`!

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
4. Template
5. Page

_NOTE:_ Components with lower level cannot depend on components with higher level.

For this every component library should have associated ONE level tag:

1. `level:atom`
2. `level:molecule`
3. `level:organism`
4. `level:template`
5. `level:page`

## Available Tags

-   `type:*` Describes types of library
    -   `type:component-service` Component with service library
    -   `type:component` Component library
    -   `type:service` Services library
    -   `type:style` Styles library
    -   `type:util` Helper utilities library
    -   `type:meta` Meta package that does not get deployed to NPM (internal infra)
-   `level:*` Describes type of component in Atomic Design framework
    -   `level:atom`
    -   `level:molecule`
    -   `level:organism`
    -   `level:template`
    -   `level:page`

## Code generation

### Library

Every new library should be generated via NX CLI with `@nrwl/angular:library` schematic:

_NOTE_: You should assign library tags either during generation command or after in `nx.json` file.

```bash
nx g @nrwl/angular:library <my-lib> --importPath=@spryker/<my-lib> --tags level:<level>
```

When library is generated please do the following:

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
        "path": "./libs/<lib-name>/tsconfig.lib.json"
      },
      {
        "path": "./libs/<lib-name>/tsconfig.spec.json"
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
-   In `libs/<lib-name>/jest.config.js`
    -   remove following sections:
    ```json
      "transform": { ... },
      "snapshotSerializers": { ... }
    ```
-   In `libs/<lib-name>/ng-package.json`
    -   add `styleIncludePaths` to `lib` for theme imports:
    ```json
      "lib": {
        ...
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

### Component

Every new component should be generated via NX CLI with `@nrwl/angular:library` schematic:

```bash
nx g @schematics/angular:component --name=<my-component> --project=<my-lib>
```

### Storybook Setup

Storybook setup should be added via NX CLI with `@nrwl/storybook:configuration` schematic:

```bash
nx g @nrwl/storybook:configuration --name=<my-lib>
```

_NOTE:_ Do the following updates after command above:

-   Add `import '../../../.storybook/preview';` to the `.storybook/preview.js`

### Library Stories

Generate stories for library module via NX CLI with `@nrwl/angular:stories` schematic:

```bash
nx g @nrwl/angular:stories --name=<my-lib>
```

_NOTE_: `NgModule`s of the library should declare components for which stories should be generated.  
This command can be re-run many times - it will only generate missing stories and keep existing ones untouched.

### Component Stories

Generate stories for components via NX CLI with `@nrwl/angular:stories` schematic:

```bash
nx g @nrwl/angular:component-story --lib-path libs/<my-lib> --component-path src/lib --component-name <MyComponent> --component-file-name <my.component> --module-file-name <my.module>
```

## Localisation / I18N

The localization is provided from each package directly for the package.

The location of i18n files are in: `libs/<my-lib>/src/i18n/`.

Then each specific language is placed in it's own file (ex. `en.ts` or `de.ts`)
and MUST default export an interface [`I18nLocaleDataPackage`](libs/locale/src/lib/i18n/types.ts#L10) from package `locale`.

All of the i18n files are then aggregated into a main package `locale` during a build phase.

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

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

-   [Angular](https://angular.io)
    -   `ng add @nrwl/angular`
-   [React](https://reactjs.org)
    -   `ng add @nrwl/react`
-   Web (no framework frontends)
    -   `ng add @nrwl/web`
-   [Nest](https://nestjs.com)
    -   `ng add @nrwl/nest`
-   [Express](https://expressjs.com)
    -   `ng add @nrwl/express`
-   [Node](https://nodejs.org)
    -   `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@spryker/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
