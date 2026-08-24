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
 * Angular 21 flipped `bootstrapApplication()` to zoneless by default:
 * `internalCreateApplication()` used to prepend `internalProvideZoneChangeDetection({})` and now
 * prepends `provideZonelessChangeDetectionInternal()` (`NgZone` → `NoopNgZone`,
 * `ZONELESS_ENABLED` → `true`; the token's own default factory also flipped `false` → `true`).
 *
 * `@storybook/angular` bootstraps every story with `bootstrapApplication()` and only adds a change
 * detection provider when its `experimentalZoneless` builder option is set, so the whole preview
 * silently became zoneless at the Angular 21 bump. That is a change of runtime, not of components:
 * it made the migration's pixel baseline measure a different Angular than phases 1-7 did (that gate
 * has since been removed), and it breaks any
 * component that relies on `ApplicationRef.tick()`'s global check — `@spryker/radio`'s
 * `registerRadio()` emits from inside a child's creation change-detection pass, where
 * `markViewDirty()` sets only `Dirty` and never `RefreshView`, so a zoneless `_tick()` skips it.
 *
 * These libraries are published as zone-based Angular libraries, and their consumers are
 * zone-based. Opt the preview back in explicitly so Storybook keeps rendering them the way they
 * are actually used. Zoneless readiness is a separate decision — see docs/ng22-migration/backlog.md.
 *
 * `@storybook/angular` 10.5.10 also unshifts `provideZonelessChangeDetection()` into every story's
 * providers: its `STORYBOOK_ANGULAR_OPTIONS?.experimentalZoneless` guard does not survive the
 * preview build, and setting the option explicitly does not change the emitted bundle. The
 * provider below is appended after it and therefore wins, at the cost of two dev-mode warnings per
 * story — NG0914 ("still loading Zone.js") and NG0408 ("both ... are provided"). Both are
 * expected here; neither affects rendering.
 */
/**
 * ng-zorro-antd 22 introduced `NzDateAdapter` as a required injectable and ships no default
 * provider for it, so `nz-date-picker` throws `NG0201: No provider found for NzDateAdapter` the
 * moment it renders. `@spryker/date-picker` deliberately does not provide one — `ng-zorro-antd`
 * 20 and 21 have no `provideNzNativeDateAdapter` to import, and providing it inside
 * `DatePickerModule` would make the package zorro-22-only (see D15 in
 * docs/ng22-migration/DESIGN.md).
 *
 * The provider therefore belongs to the application bootstrap, and Storybook's preview *is* this
 * repo's application bootstrap. This is not a library change: `.storybook/preview.js` is not
 * published, so no package's peer range or emitted output is affected by it. Without it,
 * `datepickercomponent--primary` and `datepickercomponent--disabled-time-via-function` render an
 * empty `<spy-date-picker>` — which is how this was caught, by the migration's since-removed pixel
 * gate being unable to capture them at all.
 */
export const decorators = [
    applicationConfig({ providers: [provideZoneChangeDetection(), provideNzNativeDateAdapter()] }),
];
