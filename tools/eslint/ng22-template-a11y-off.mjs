/**
 * Angular 20.3 -> 22 migration, phase 6.
 *
 * Nx 23's migration converted this workspace from `.eslintrc.json` to flat config. Each
 * per-project config spreads `nx.configs['flat/angular-template']` AFTER the root config,
 * and @angular-eslint's v23 template preset enables these three accessibility rules as
 * ERRORS. None of them was configured by this repo before the migration, so a root-level
 * override cannot win and the errors are preset drift, not repo intent.
 *
 * Nx's own migration output is explicit about the remedy:
 *   "For any rule that now reports errors but is not in that list, disable it in the flat
 *    config with a short explanatory comment. [...] never edit source files to satisfy a
 *    newly enabled rule."
 *
 * Fixing these means editing component templates for keyboard, focus and label semantics —
 * real accessibility work with real behaviour changes, out of scope for a version migration
 * (DESIGN D1). Tracked in docs/ng22-migration/backlog.md.
 *
 * Spread this LAST in every project config so it wins over the template preset.
 */
export default [
    {
        files: ['**/*.html'],
        rules: {
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off',

            /**
             * Phase 9 (Angular 22). @angular-eslint 22's template preset promotes
             * `prefer-control-flow` to an error. It fires on 23 sites in exactly one file,
             * `libs/table.feature.editable/src/lib/table-editable-feature.component.html` —
             * the last `*ngIf`/`*ngFor` template in the repo. Converting it is a template
             * rewrite with `*ngIf ... as` aliasing and `*ngFor` tracking semantics to
             * reproduce, and a pixel consequence on the editable feature: real work, not a
             * version bump. Tracked in docs/ng22-migration/backlog.md.
             */
            '@angular-eslint/template/prefer-control-flow': 'off',
        },
    },
];
