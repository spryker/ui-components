# locale

## I18N

Any package may have it's own set of localization data.

Locale package will locate all such data by the following glob: `libs/*/src/i18n/*.ts`.

The file name must match the targeted locale name specified as folders in `locales/*`.

The file must export default interface called [`I18nLocaleDataPackage`](src/lib/i18n/types.ts).

The name in each locale file must be specified and will be used
to prefix all tokens with it via dot (`.`) - so later translations must reference it
with this name prefixed. This is done for easier navigation of the source of translations.

For example:

-   If the file specifies that name is `prefix`
-   And if the file defined translation with token `example`
-   Then in the application to get this translation use token `prefix.example`

### Bundling

Before the build phase all such locale files will be found in all packages
and aggregated in single data files by a target language
which later will be included in the specific locale NgModule via lazy-loading.

---

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test locale` to execute the unit tests.
