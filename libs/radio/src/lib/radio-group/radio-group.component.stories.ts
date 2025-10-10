import { importProvidersFrom } from '@angular/core';
import { Meta, moduleMetadata } from '@storybook/angular';
import { WebComponentsModule } from '@spryker/web-components';
import { RadioModule } from '../radio.module';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';

enum RadioGroupValue {
    FirstRadioValue = 'A',
    SecondRadioValue = 'B',
}

export default {
    title: 'RadioGroupComponent',
    component: RadioGroupComponent,
    decorators: [
        moduleMetadata({
            imports: [RadioModule],
        }),
    ],
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
            options: Object.values(RadioGroupValue),
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
    template: `
    <spy-radio-group [value]="value" [name]="name">
      <spy-radio [value]="firstRadioValue">Label A</spy-radio>
      <spy-radio [value]="secondRadioValue">Label B</spy-radio>
    </spy-radio-group>
  `,
});

export const asWebComponents = (args) => ({
    props: args,
    applicationConfig: {
        providers: [importProvidersFrom(WebComponentsModule.withComponents([RadioGroupComponent, RadioComponent]))],
    },
    template: `
      <web-spy-radio-group [attr.value]="value" [attr.name]="name">
        <web-spy-radio [attr.value]="firstRadioValue">Label A</web-spy-radio>
        <web-spy-radio [attr.value]="secondRadioValue">Label B</web-spy-radio>
      </web-spy-radio-group>
  `,
});
