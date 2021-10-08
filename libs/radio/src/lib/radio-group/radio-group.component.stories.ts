import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';

import { RadioModule } from '../radio.module';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'RadioGroupComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [RadioModule],
  },
  template: `
    <spy-radio-group [value]="value">
      <spy-radio [value]="'A'">Label A</spy-radio>
      <spy-radio [value]="'B'">Label B</spy-radio>
    </spy-radio-group>
  `,
  props: {
    value: text('value', 'A'),
  },
});

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [
      WebComponentsModule.forRoot(),
      WebComponentsModule.withComponents([
        { component: RadioGroupComponent, isRoot: true },
        { component: RadioComponent },
      ]),
      RadioModule,
    ],
    entryComponents: [RadioGroupComponent, RadioComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-radio-group value="A">
      <web-spy-radio value="A">Label A</web-spy-radio>
      <web-spy-radio value="B">Label B</web-spy-radio>
    </web-spy-radio-group>
  `,
});
