import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import DeLocaleModule, { DE_LOCALE } from '@spryker/locale/locales/de';
import EnLocaleModule, { EN_LOCALE } from '@spryker/locale/locales/en';
import TrLocaleModule, { TR_LOCALE } from '@spryker/locale/locales/tr';
import { LocaleModule } from '../locale.module';

const locales = { English: EN_LOCALE, German: DE_LOCALE, Turkish: TR_LOCALE };

export default {
    title: 'LocaleSwitcherComponent',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(LocaleModule.forRoot()),
                importProvidersFrom(EnLocaleModule),
                importProvidersFrom(DeLocaleModule),
                importProvidersFrom(TrLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [LocaleModule],
        }),
    ],
    argTypes: {
        locale: {
            control: { type: 'select' },
            options: locales,
        },
    },
    args: {
        locale: locales.English,
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        now: Date.now(),
    },
    template: `
    <spy-locale-switcher [locale]="locale"></spy-locale-switcher>
    <p *spyLocaleRender>Date: {{ now | date:'medium' }}</p>
  `,
});
