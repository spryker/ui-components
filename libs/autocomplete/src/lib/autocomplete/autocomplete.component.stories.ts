import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent, InputModule } from '@spryker/input';
import { WebComponentsModule } from '@spryker/web-components';

import { AutocompleteModule } from '../autocomplete.module';
import { AutocompleteComponent } from './autocomplete.component';

export default {
  title: 'AutocompleteComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [AutocompleteModule, BrowserAnimationsModule, InputModule],
  },
  template: `
    <spy-input>
      <spy-autocomplete [options]="options"></spy-autocomplete>
    </spy-input>
  `,
  props: {
    options: [
      {
        value: 'Burns Bay Road',
        title:
          'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
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
    ],
  },
});

export const autocompleteAsWebComponents = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      WebComponentsModule.forRoot(),
      WebComponentsModule.withComponents([
        { component: InputComponent, isRoot: true },
        { component: AutocompleteComponent },
      ]),
      InputModule,
      AutocompleteModule,
    ],
    entryComponents: [InputComponent, AutocompleteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-input>
      <web-spy-autocomplete [options]="options"></web-spy-autocomplete>
    </web-spy-input>
  `,
  props: {
    options: JSON.stringify([
      {
        value: 'Burns Bay Road',
        title:
          'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
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
    ]),
  },
});
