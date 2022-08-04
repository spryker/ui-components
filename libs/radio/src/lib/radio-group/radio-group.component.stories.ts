import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Meta } from '@storybook/angular';
import { WebComponentsModule } from '@spryker/web-components';
import { StorybookModule } from '@spryker/web-components/storybook';
import { RadioModule } from '../radio.module';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { text } from '@storybook/addon-knobs';

enum RadioGroupValue {
  FirstRadioValue = 'A',
  SecondRadioValue = 'B',
}

export default {
  title: 'RadioGroupComponent',
  component: RadioGroupComponent,
  parameters: {
    controls: {
      include: ['value', 'name', 'firstRadioValue', 'secondRadioValue'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9337',
      allowFullscreen: true,
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: RadioGroupValue,
    },
    firstRadioValue: {
      table: {
        disable: true,
      },
    },
    secondRadioValue: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    value: RadioGroupValue.FirstRadioValue,
    name: 'custom-name',
    firstRadioValue: RadioGroupValue.FirstRadioValue,
    secondRadioValue: RadioGroupValue.SecondRadioValue,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [RadioModule],
  },
  template: `
    <spy-radio-group [value]="value" [name]="name">
      <spy-radio [value]="firstRadioValue">Label A</spy-radio>
      <spy-radio [value]="secondRadioValue">Label B</spy-radio>
    </spy-radio-group>
  `,
});

export const asWebComponents = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      StorybookModule,
      WebComponentsModule.withComponents([RadioGroupComponent, RadioComponent]),
      RadioModule,
    ],
    entryComponents: [RadioGroupComponent, RadioComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-storybook>
      <web-spy-radio-group [attr.value]="value" [attr.name]="name">
        <web-spy-radio [attr.value]="firstRadioValue">Label A</web-spy-radio>
        <web-spy-radio [attr.value]="secondRadioValue">Label B</web-spy-radio>
      </web-spy-radio-group>
    </web-spy-storybook>
  `,
});
