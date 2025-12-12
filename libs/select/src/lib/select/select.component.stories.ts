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
    tags: ['autodocs'],
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
        options: {
            control: { type: 'object' },
            description: 'Array of options to display in the select dropdown',
            table: {
                type: { summary: 'SelectOption[]' },
                defaultValue: { summary: '[]' },
                category: 'Inputs',
            },
        },
        value: {
            control: { type: 'object' },
            description: 'Current selected value(s) - single value or array for multiple selection',
            table: {
                type: { summary: 'SelectValueSelected' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        search: {
            control: { type: 'boolean' },
            description: 'Enables search/filter functionality for options',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        serverSearch: {
            control: { type: 'boolean' },
            description: 'Enables server-side search (search query emitted via searchChange)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the select preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        multiple: {
            control: { type: 'boolean' },
            description: 'Enables multiple selection mode',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when no option is selected',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        showSelectAll: {
            control: { type: 'boolean' },
            description: 'Shows "Select All" option in multiple selection mode',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        tags: {
            control: { type: 'boolean' },
            description: 'Enables tag mode - allows creating new tags (also enables multiple mode)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        tagView: {
            control: { type: 'boolean' },
            description: 'Shows selected values as tags',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disableClear: {
            control: { type: 'boolean' },
            description: 'Disables the clear button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the select element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        datasource: {
            control: { type: 'object' },
            description: 'Datasource configuration for dynamic option loading',
            table: {
                type: { summary: 'DatasourceConfig' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        valueChange: {
            description: 'Emits when selected value changes',
            table: {
                type: { summary: 'EventEmitter<SelectValueSelected>' },
                category: 'Outputs',
            },
        },
        searchChange: {
            description: 'Emits when search input changes (for server-side filtering)',
            table: {
                type: { summary: 'EventEmitter<string>' },
                category: 'Outputs',
            },
        },
        tagClick: {
            description: 'Emits when a tag is clicked',
            table: {
                type: { summary: 'EventEmitter<SelectValue>' },
                category: 'Outputs',
            },
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
            valueChange: console.info,
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
