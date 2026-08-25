// `zone.js` must be loaded before `provideZoneChangeDetection()` below can construct an `NgZone`.
// Storybook's Angular builder no longer contributes it to the webpack `polyfills` entry, so the
// preview loads it itself.
import 'zone.js';
import { provideZoneChangeDetection } from '@angular/core';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import { provideNzNativeDateAdapter } from 'ng-zorro-antd/core/time';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import docJson from '../dist/documentation.json';
// Needed for Orchestrator
import 'reflect-metadata/lite';

setCompodocJson(docJson);

export const parameters = {
    controls: {
        hideNoControlsWarning: true,
    },
};
export const tags = ['autodocs'];

/**
 * These libraries are zone-based and published as such; zoneless support is not planned.
 * Angular 21 flipped `bootstrapApplication()` to zoneless by default and `@storybook/angular`
 * bootstraps every story that way, which silently broke components that notify a parent from a
 * child's creation pass (`@spryker/radio` renders nothing). The provider below is appended after
 * Storybook's own zoneless provider and therefore wins; NG0914 and NG0408 dev warnings per story
 * are expected and harmless.
 *
 * `provideNzNativeDateAdapter` belongs here rather than in `@spryker/date-picker`: zorro 22 made
 * `NzDateAdapter` a required injectable with no default, but zorro 20 and 21 have no such symbol,
 * so providing it inside `DatePickerModule` would make the package zorro-22-only (DESIGN D15).
 * This file is not published, so no peer range or emitted output is affected.
 */
export const decorators = [
    applicationConfig({ providers: [provideZoneChangeDetection(), provideNzNativeDateAdapter()] }),
];
