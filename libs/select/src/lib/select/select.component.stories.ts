import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { SelectModule } from '../select.module';
import { SelectComponent } from './select.component';

export default {
    title: 'SelectComponent',
    component: SelectComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [SelectModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'options',
                'value',
                'search',
                'disabled',
                'multiple',
                'placeholder',
                'showSelectAll',
                'selectAllTitle',
                'name',
                'noOptionsText',
                'disableClear',
                'tags',
                'tagView',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9152',
            allowFullscreen: true,
        },
    },
    argTypes: {
        placeholder: {
            control: { type: 'text' },
        },
        value: {
            control: { type: 'array' },
        },
    },
    args: {
        tagView: false,
        options: ['Option 1', 'Option 2', 'Option 3'],
        tags: false,
        multiple: true,
        placeholder: 'Select option...',
        selectAllTitle: 'Select All',
        name: 'some-name',
        noOptionsText: 'No options',
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        valueChange: console.log,
    },
});
primary.argTypes = {
    value: {
        control: { type: 'text' },
    },
};
primary.args = {
    options: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
    ],
    value: 'Option 1',
    multiple: false,
    tags: false,
};

export const multiSelect = (args) => ({
    props: args,
});
multiSelect.args = {
    options: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
};

export const multiSelectWithoutOptionsMapping = (args) => ({
    props: args,
});
multiSelectWithoutOptionsMapping.args = {
    options: [
        { value: 1, title: 'Option 1' },
        { value: '2', title: 'Option 2' },
        { value: '3', title: 'Option 3' },
    ],
    value: [1, '2'],
};

export const withSelectAll = (args) => ({
    props: args,
});
withSelectAll.args = {
    showSelectAll: true,
};

export const withTags = (args) => ({
    props: args,
});
withTags.args = {
    tags: true,
};
