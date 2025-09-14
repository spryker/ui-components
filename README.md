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

- `type:*` Describes the library type
    - `type:component-service` Component with service library
    - `type:component` Component library
    - `type:service` Services library
    - `type:style` Styles library
    - `type:util` Helper utilities library
    - `type:meta` Meta package that does not get deployed to NPM (internal infra)
- `level:*` Describes the component type according to the Atomic Design framework
    - `level:atom`
    - `level:molecule`
    - `level:organism`
- `pkg:*` Describes the package type
    - `pkg:primary`
    - `pkg:extension`

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

- git tags are created
- package versions updated
- package changelogs updated
- packages published to NPM registry

These are the release branches (`git branch` => `@npm tag`):

- `master` => `@latest`
- `next` => `@next`
- `beta` => `@beta`
- `alpha` => `@alpha`
- `rc` => `@rc`

### Release Recovery

#### NPM

Sometimes publishing to NPM may fail due to several reasons:

- NPM services experience outages
- Configuration of certain packages prevent them from being published by NPM
  (ex. public access is not explicitly set)

This may result in some or all packages not published even when version
and changelogs were updated and pushed back to git.

In this case you need to:

1. Make sure that the issue that prevented packages from publishing is resolved
2. Merge the branch that failed into related `recovery` branch (add to name prefix `republish/`)

**Recovery branches for republishing:**

- `master` => `republish/master`
- `next` => `republish/next`
- `beta` => `republish/beta`
- `alpha` => `republish/alpha`
- `rc` => `republish/rc`

After branch is pushed to CI it will attempt to find unpublished packages in NPM
and try to publish them again with the same versions.

---

## Documentation

- [Nx](https://nx.dev/angular)
- [Angular](https://angular.io/docs)
- [RxJs](https://rxjs.dev/guide/overview)
- [Ant Design](https://ng.ant.design/docs/introduce/en)
- [UI Components](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/marketplace/marketplace-frontend.html)

## Contributing to the repository

For contribution guidelines, see [Code contribution guide](https://github.com/spryker/ui-components/blob/master/CONTRIBUTING.md).
