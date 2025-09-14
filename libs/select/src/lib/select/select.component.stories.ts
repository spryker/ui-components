import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { WebComponentsModule } from '@spryker/web-components';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { OptionComponent } from '../option/option.component';
import { SelectModule } from '../select.module';
import { SelectedOptionComponent } from '../selected-option/selected-option.component';
import { SelectComponent } from './select.component';
import { Story } from 'storybook/internal/csf';

const OPTIONS = [
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
] as const;

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
            control: { type: 'object' },
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

export const primary = {
    render: (args) => ({
        props: {
            ...args,
            valueChange: console.log,
        },
    }),
    argTypes: {
        value: {
            control: { type: 'select' },
            options: [...OPTIONS],
        },
    },
    args: {
        options: [...OPTIONS],
        value: 'Option 1',
        multiple: false,
        tags: false,
    },
};

export const multiSelect = {
    render: (args) => ({ props: args }),
    argTypes: {
        value: {
            control: { type: 'multi-select' },
            options: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            ],
        },
    },
    args: {
        options: [
            'Option 1',
            'Option 2',
            'Option 3',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ],
        value: ['Option 1'],
        multiple: true,
    },
};

export const multiSelectWithoutOptionsMapping = {
    render: (args) => ({ props: args }),
    argTypes: {
        value: { control: { type: 'object' } },
    },
    args: {
        options: [
            { value: 1, title: 'Option 1' },
            { value: '2', title: 'Option 2' },
            { value: '3', title: 'Option 3' },
        ],
        value: [1, '2'],
        multiple: true,
    },
};

export const withSelectAll = {
    render: (args) => ({ props: args }),
    args: { showSelectAll: true },
};

export const withTags = {
    render: (args) => ({ props: args }),
    args: { tags: true },
};

export const withCustomContent = {
    render: (args) => ({
        props: args,
        template: `
      <spy-select
        customOptionTemplate="true"
        [placeholder]="placeholder"
        [multiple]="multiple"
        [search]="search"
        [value]="'option1'"
      >
        <spy-option value="option1" title="Red text">
          <span style="color: red; font-weight: 400">Red text</span>
        </spy-option>
        <spy-option value="option2" title="Bold text" disabled>
          <span style="font-weight: 700">Bold text</span>
        </spy-option>
        <spy-option value="option3" title="Italic text">
          <span style="font-style: italic">Italic text</span>
        </spy-option>
        <spy-selected-option>
          <span before>before </span>
          <span after> after</span>
        </spy-selected-option>
      </spy-select>
    `,
    }),
    args: { multiple: false },
};

export const asWebComponents = {
    render: () => ({
        applicationConfig: {
            providers: [
                importProvidersFrom(
                    WebComponentsModule.withComponents([SelectComponent, OptionComponent, SelectedOptionComponent]),
                ),
            ],
        },
        template: `
      <web-spy-select custom-option-template="true">
        <web-spy-option value="option1" title="Red text">
            <span style="color: red; font-weight: 400">Red text</span>
        </web-spy-option>
        <web-spy-option value="option2" disabled="true" title="Bold text">
            <span style="font-weight: 700">Bold text</span>
        </web-spy-option>
        <web-spy-option value="option3" title="Italic text">
            <span style="font-style: italic">Italic text</span>
        </web-spy-option>
        <web-spy-selected-option selected>
            <span before>before </span>
            <span after> after</span>
        </web-spy-selected-option>
      </web-spy-select>
    `,
    }),
};
