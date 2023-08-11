import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
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
            include: ['options'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9154',
            allowFullscreen: true,
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
    moduleMetadata: {
        entryComponents: [InputComponent, AutocompleteComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
