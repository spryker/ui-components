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
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2022,
            },
        },
    },
    {
        files: ['./data/**/src/*.ts', './data/**/src/data/*.ts', './locales/**/src/index.ts'],
        rules: {
            'no-var': 0,
            '@nx/enforce-module-boundaries': 0,
        },
    },
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
    ...ng22TemplateA11yOff,
];
