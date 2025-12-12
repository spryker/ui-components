import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputComponent, InputModule } from '@spryker/input';
import { WebComponentsModule } from '@spryker/web-components';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { AutocompleteModule } from '../autocomplete.module';
import { AutocompleteComponent } from './autocomplete.component';

const mockAutocompleteOptions = [
    {
        value: 'Burns Bay Road',
        title: 'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
        isDisabled: false,
    },
    {
        value: 'Downing Street',
        title: 'Downing Street',
        isDisabled: true,
    },
    {
        value: 'Wall Street',
        title: 'Wall Street',
    },
];

export default {
    title: 'AutocompleteComponent',
    component: AutocompleteComponent,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [AutocompleteModule, InputModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['options', 'datasource', 'context'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9344',
            allowFullscreen: true,
        },
    },
    argTypes: {
        options: {
            description:
                'Array of autocomplete options with value, title, and isDisabled properties. AutocompleteValue interface: { value: unknown; title: string; isDisabled?: boolean }',
            table: {
                type: { summary: 'AutocompleteValue[]' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        datasource: {
            description: 'Datasource configuration for loading options dynamically',
            table: {
                type: { summary: 'DatasourceConfig' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        context: {
            description: 'Context object passed to datasource',
            table: {
                type: { summary: 'unknown' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
    },
    args: {
        options: mockAutocompleteOptions,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-input>
      <spy-autocomplete [options]="options"></spy-autocomplete>
    </spy-input>
  `,
});

export const autocompleteAsWebComponents = (args) => ({
    props: args,
    applicationConfig: {
        providers: [importProvidersFrom(WebComponentsModule.withComponents([InputComponent, AutocompleteComponent]))],
    },
    template: `
      <web-spy-input>
        <web-spy-autocomplete [attr.options]="options"></web-spy-autocomplete>
      </web-spy-input>
  `,
});
autocompleteAsWebComponents.args = {
    options: JSON.stringify(mockAutocompleteOptions),
};
