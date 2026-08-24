import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import jsoncEslintParser from 'jsonc-eslint-parser';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

export default [
    ...compat.extends('plugin:storybook/recommended'),
    ...nx.configs['flat/base'],
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    depConstraints: [
                        {
                            sourceTag: 'pkg:primary',
                            onlyDependOnLibsWithTags: ['pkg:primary'],
                        },
                        {
                            sourceTag: 'pkg:extension',
                            onlyDependOnLibsWithTags: ['pkg:primary', 'pkg:extension'],
                        },
                        {
                            sourceTag: 'type:meta',
                            onlyDependOnLibsWithTags: ['type:meta', 'type:util'],
                        },
                        {
                            sourceTag: 'type:util',
                            onlyDependOnLibsWithTags: ['type:util'],
                        },
                        {
                            sourceTag: 'type:style',
                            onlyDependOnLibsWithTags: ['type:style'],
                        },
                        {
                            sourceTag: 'type:service',
                            onlyDependOnLibsWithTags: ['type:util', 'type:service', 'type:component-service'],
                        },
                        {
                            sourceTag: 'type:component',
                            onlyDependOnLibsWithTags: [
                                'type:util',
                                'type:service',
                                'type:component',
                                'type:component-service',
                            ],
                        },
                        {
                            sourceTag: 'type:component-service',
                            onlyDependOnLibsWithTags: [
                                'type:util',
                                'type:service',
                                'type:component',
                                'type:component-service',
                            ],
                        },
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    {
        // `**/.storybook/*.js` is a deliberate, permanent exemption, not migration debt.
        // Each lib's `.storybook/main.js` and `preview.js` reach the workspace-root Storybook
        // config by relative path (`../../../.storybook/main.js`). Phase 7 rewrote all 88 configs
        // from CJS `require` to ESM `import`, which does not change the fact: an ESM relative
        // import out of a project root is the same boundary crossing the CJS `require` was, and
        // the rule reports it identically. The only alternative is to give every lib some other
        // route to the root config, which is a Storybook-architecture change, not a version
        // migration. Measured on 2026-08-23: dropping this pattern re-adds exactly one
        // `@nx/enforce-module-boundaries` error per lib (88 in total).
        files: ['**/*.spec.ts', '**/*.stories.ts', './testing/src/*.ts', '**/.storybook/*.js'],
        rules: {
            '@nx/enforce-module-boundaries': 0,
        },
    },
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/angular'],
    {
        // `@angular-eslint/eslint-plugin-template` 22 dropped its legacy eslintrc `configs`
        // export, so `plugin:@angular-eslint/template/process-inline-templates` no longer
        // resolves through `FlatCompat`. `nx.configs['flat/angular']` spread above already
        // registers the inline-template processor on `**/*.ts`, so all that is left to carry
        // here are the rule overrides.
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/ban-types': 0,
            '@typescript-eslint/no-empty-interface': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-vars': 0,
            '@angular-eslint/no-host-metadata-property': 0,
            '@angular-eslint/directive-class-suffix': 0,
            // @angular-eslint 22 promotes this to an error by default. It fires on exactly
            // five `ChangeDetectionStrategy.Default` sites: three spec-local components, and
            // `@spryker/modal`'s `ConfirmModalComponent` / `ModalWrapperComponent`. Those two
            // are a settled D12/D8 decision — both were measured to break under OnPush
            // (`ModalWrapperComponent` structurally, because an OnPush view blocks traversal
            // into its own view containers). Satisfying the rule would mean reverting that
            // decision, so the rule is off rather than the pins removed.
            '@angular-eslint/prefer-on-push-component-change-detection': 0,
            'no-prototype-builtins': 0,
            '@typescript-eslint/no-unused-expressions': 0,
            '@typescript-eslint/no-empty-object-type': 0,
            'no-extra-semi': 'error',
        },
    },
    ...nx.configs['flat/javascript'],
    {
        files: ['**/*.js', '**/*.jsx'],
        rules: {
            'no-extra-semi': 'error',
        },
    },
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'warn',
                {
                    ignoredDependencies: [
                        'tslib',
                        '@spryker/*',
                        'ng-zorro-antd',
                        '@rollup/plugin-typescript',
                        '@rollup/plugin-node-resolve',
                        '@rollup/plugin-commonjs',
                        'url',
                        'globby',
                        'date-fns',
                    ],
                },
            ],
        },
        languageOptions: {
            parser: jsoncEslintParser,
        },
    },

    // --- Angular 20.3 -> 22 migration, phase 6 (Nx 23 flat-config conversion) ---
    // Nx 23's migration converted this workspace from .eslintrc.json to flat config.
    // The block below restores the pre-migration lint result, following Nx's own migration
    // guidance: "never edit source files to satisfy a newly enabled rule"; rules that newly
    // error come from changed preset defaults, not from this repo.
    {
        // GENERATED i18n BUNDLES - build output of `npm run build:i18n` (rollup).
        // Already gitignored by libs/locale/data/.gitignore ("*/src/data/*"); ESLint had no
        // matching ignore, and flat config's file discovery started linting them, producing
        // 104 `no-var` errors in emitted code. Linting build output is meaningless.
        ignores: ['libs/locale/data/*/src/data/**'],
    },
    {
        // PACKED LIBRARY OUTPUT - ng-packagr build output of `npm run pack`, and the second
        // instance of the same class as the block above. It only exists after a pack, which is
        // why the phase-6 conversion missed it: the pre-migration .eslintrc pair (root
        // `ignorePatterns: ["**/*"]` + per-project `["!**/*"]`) kept ESLint out of it, and the
        // generated flat config carried no replacement. Linting emitted code is meaningless,
        // and here it is also actively harmful: 14 of the 115 packed `index.d.ts` files
        // self-import their own package name (`import * as _spryker_icon from '@spryker/icon'`),
        // `tsconfig.base.json` maps `@spryker/*` to `dist/libs/*` FIRST, and the resulting
        // resolution cycle hangs ESLint indefinitely (`icon`, `modal`, `table`, `date-picker`
        // and 10 others). Measured 2026-08-23: without this, `nx lint spinner` goes 3 findings
        // -> 5 and `nx lint button` 8 -> 20, and `npx eslint libs/icon/dist/index.d.ts` never
        // returns. No migration phase gate is affected (the gate order runs `npm test` first,
        // and `pretest` = `clean:dist`), but `npm run hook:push` in a post-pack tree is.
        ignores: ['libs/*/dist/**'],
    },
    {
        // `label-has-associated-control`, configured with this design system's own control
        // directives. Previously carried by tools/eslint/ng22-template-a11y-off.mjs, which was
        // spread last in all 118 per-project configs; that module is gone and this is all that
        // was left of it.
        //
        // `@spryker/radio` and `@spryker/checkbox` render `<label nz-radio>` and
        // `<label nz-checkbox>`. Both ng-zorro directives put a native `<input type="radio">` /
        // `<input type="checkbox">` INSIDE their host element, so each label already wraps its
        // own control: the association is implicit and correct. The rule's
        // `hasControlComponentIn()` only walks the child nodes of the template it is linting, and
        // that input lives in ng-zorro's template — so without `labelComponents` it reports three
        // false errors (two in `libs/radio`, one in `libs/checkbox`).
        //
        // Adding a `for` to satisfy the rule would be the wrong repair. The only id in either
        // template is `spyId`, which sits on `@spryker/checkbox`'s `display: none` form-value
        // input, so `for="…"` would replace a correct implicit association with an explicit one
        // pointing at a control no user can reach.
        //
        // `inputs` is the rule's list of attributes that count as an association. `for` and
        // `htmlFor` are repeated because a `labelComponents` entry REPLACES the default entry for
        // the same selector rather than extending it. The rule stays an error: a `<label>` with
        // neither an association attribute nor a control inside it still reports.
        //
        // WHY THIS WORKS AT THE ROOT, given every per-project config spreads
        // `nx.configs['flat/angular-template']` AFTER `...baseConfig`: that preset sets this rule
        // severity-only (`'error'`, no options), and ESLint flat config RETAINS previously
        // configured options when a later entry supplies only a severity. So these options survive
        // the later spread. Verified 2026-08-24: `eslint --config libs/radio/eslint.config.mjs
        // --print-config` resolves the rule to `[2, { labelComponents: [...] }]`, and `nx lint
        // radio` / `nx lint checkbox` are 0 errors with no per-project import. The negative
        // control (rule absent here, module deleted) reproduces exactly the three errors.
        //
        // This does NOT generalise to severity: a later preset spread does override an earlier
        // severity, which is why the deleted module had to be spread last back when it was
        // switching rules off.
        //
        // Pinned by `libs/checkbox/src/lib/checkbox/checkbox.component.a11y.spec.ts` and, for
        // radio, by the `label[nz-radio] input` queries in `radio.component.spec.ts`.
        files: ['**/*.html'],
        rules: {
            '@angular-eslint/template/label-has-associated-control': [
                'error',
                {
                    labelComponents: [{ selector: 'label', inputs: ['for', 'htmlFor', 'nz-radio', 'nz-checkbox'] }],
                },
            ],
        },
    },
];
