import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import baseConfig from '../../eslint.config.mjs';
import ng22TemplateA11yOff from '../../tools/eslint/ng22-template-a11y-off.mjs';
import nx from '@nx/eslint-plugin';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

export default [
    ...baseConfig,
    ...compat.extends('plugin:storybook/recommended'),
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'spy',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'spy',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/prefer-standalone': 'off',
        },
    },
    ...nx.configs['flat/angular-template'],
    // `@nx/dependency-checks` is configured once, at the workspace root: severity `warn` plus the
    // shared `ignoredDependencies` list. This project used to re-declare it here as `error` with no
    // options — a stray from the original Nx library generator that the phase-6 flat-config
    // conversion carried over verbatim from `.eslintrc.json`. Only 3 of the 117 libs had it, and
    // dropping the root's options made the local copy behave differently from the other 114.
    ...ng22TemplateA11yOff,
];
