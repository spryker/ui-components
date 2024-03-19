import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';

import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectModule } from '../tree-select.module';

export default {
    title: 'TreeSelectComponent',
    component: TreeSelectComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [TreeSelectModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'items',
                'value',
                'search',
                'disabled',
                'multiple',
                'placeholder',
                'name',
                'noOptionsText',
                'disableClear',
                'valueChange',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9152',
            allowFullscreen: true,
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
        },
        valueChange: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        items: [
            {
                title: 'Option 1',
                value: 'Option 1',
                children: [
                    { title: 'Option 7', value: 'Option 7' },
                    { title: 'Option 8', value: 'Option 8' },
                ],
            },
            { title: 'Option 2', value: 'Option 2' },
            { title: 'Option 3', value: 'Option 3' },
            { title: 'Option 4', isDisabled: true, value: 'Option 4' },
            { title: 'Option 5', value: 'Option 5' },
            { title: 'Option 6', value: 'Option 6' },
        ],
        value: 'Option 2',
        search: true,
        multiple: true,
        placeholder: 'Select option...',
        name: 'some-name',
        noOptionsText: 'No options...',
        valueChange: console.log,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withoutOptions = (args) => ({
    props: args,
});
withoutOptions.args = {
    items: [],
    value: '',
};
