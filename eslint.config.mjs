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
        // `**/.storybook/*.js` is a permanent exemption: each lib's Storybook config reaches the
        // workspace-root one by relative path, which the rule reports as a boundary crossing.
        // Removing the pattern re-adds one error per lib (88).
        files: ['**/*.spec.ts', '**/*.stories.ts', './testing/src/*.ts', '**/.storybook/*.js'],
        rules: {
            '@nx/enforce-module-boundaries': 0,
        },
    },
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/angular'],
    {
        // `nx.configs['flat/angular']` above already registers the inline-template processor,
        // so only rule overrides remain here (plugin 22 dropped its eslintrc `configs` export).
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/ban-types': 0,
            '@typescript-eslint/no-empty-interface': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-vars': 0,
            '@angular-eslint/no-host-metadata-property': 0,
            '@angular-eslint/directive-class-suffix': 0,
            // Off, not fixed: it fires on `@spryker/modal`'s two `Default` pins, which were
            // measured to break under OnPush and are a settled D12/D8 decision.
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

    {
        // Generated i18n bundles (rollup output of `npm run build:i18n`). Gitignored, but flat
        // config's file discovery started linting them: 104 `no-var` errors in emitted code.
        ignores: ['libs/locale/data/*/src/data/**'],
    },
    {
        // Packed ng-packagr output. Must stay ignored: 14 of the 115 packed `index.d.ts` files
        // self-import their own package name, `tsconfig.base.json` maps `@spryker/*` to
        // `dist/libs/*` first, and the resolution cycle hangs ESLint indefinitely.
        ignores: ['libs/*/dist/**'],
    },
    {
        // `label-has-associated-control` needs this design system's control directives declared:
        // `<label nz-radio>` / `<label nz-checkbox>` already wrap a native input, but ng-zorro
        // renders it in its own template, which the rule cannot see — without `labelComponents` it
        // reports three false errors. Adding `for` would be the wrong fix: the only id available
        // sits on a `display: none` input. `for`/`htmlFor` are repeated because an entry replaces
        // the default for that selector instead of extending it.
        //
        // This survives the per-project `flat/angular-template` spread because that preset sets the
        // rule severity-only, and flat config retains previously configured options in that case.
        // It would NOT survive a severity override. Pinned by checkbox.component.a11y.spec.ts and
        // the `label[nz-radio] input` queries in radio.component.spec.ts.
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
