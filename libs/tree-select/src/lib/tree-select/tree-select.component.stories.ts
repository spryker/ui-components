import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { TreeSelectModule } from '../tree-select.module';
import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectItem } from './types';

let counter = 0;

const option = (title?: string, isDisabled = false): TreeSelectItem => {
    counter += 1;

    const value = `Option ${counter}`;

    return { title: title ?? value, value, isDisabled };
};

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
                ...option(
                    'Anim ad aute culpa adipisicing aute ad mollit deserunt tempor incididunt. Reprehenderit incididunt nostrud ut eiusmod quis sint tempor ex ipsum aute.',
                ),
                children: [option(), option()],
            },
            {
                ...option(),
                children: [
                    option(),
                    {
                        ...option(),
                        children: [option(), option()],
                    },
                ],
            },
            option(),
            option('disabled', true),
            option(),
            option(),
        ],
        value: 'Option 2',
        search: true,
        multiple: true,
        placeholder:
            'Anim ad aute culpa adipisicing aute ad mollit deserunt tempor incididunt. Reprehenderit incididunt nostrud ut eiusmod quis sint tempor ex ipsum aute.',
        name: 'some-name',
        noOptionsText: 'No options...',
        valueChange: console.info,
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
