import { Component, importProvidersFrom, Input } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import EnLocaleModule, { EN_LOCALE } from '../../locales/en/src';
import DeLocaleModule, { DE_LOCALE } from '../../locales/de/src';
import TrLocaleModule, { TR_LOCALE } from '../../locales/tr/src';
import { LocaleModule } from './locale.module';

@Component({
    standalone: false,
    selector: 'spy-locale-story-component',
    template: `
        <ng-container *spyLocaleRender>
            <p>Localized date: {{ date | date }}</p>
            <br />
            <p>Localized time: {{ date | date: 'shortTime' }}</p>
            <br />
            <p>Localized currency: {{ price | currency: 'EUR' }}</p>
        </ng-container>
    `,
})
class LocaleStoryComponent {
    @Input() date: Date | number = Date.now();
    @Input() price = 100500;
}

export default {
    title: 'Locales',
    component: LocaleStoryComponent,
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            declarations: [LocaleStoryComponent],
            imports: [LocaleModule],
        }),
    ],
    argTypes: {
        date: {
            control: 'date',
        },
    },
    args: {
        date: Date.now(),
        price: 100500,
    },
} as Meta;

export const en = (args) => ({
    props: args,
});

export const de = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(LocaleModule.forRoot({ defaultLocale: DE_LOCALE })),
            importProvidersFrom(DeLocaleModule),
        ],
    },
});

export const tr = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(LocaleModule.forRoot({ defaultLocale: TR_LOCALE })),
            importProvidersFrom(TrLocaleModule),
        ],
    },
});
