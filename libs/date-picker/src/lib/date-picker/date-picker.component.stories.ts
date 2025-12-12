import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';
import { DatePickerComponent } from './date-picker.component';
import { DatePickerModule } from '../date-picker.module';

export default {
    title: 'DatePickerComponent',
    component: DatePickerComponent,
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
            imports: [DatePickerModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'clearButton',
                'disabled',
                'enableDate',
                'enableTime',
                'open',
                'time',
                'format',
                'placeholder',
                'name',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9153',
            allowFullscreen: true,
        },
    },
    argTypes: {
        clearButton: {
            control: { type: 'boolean' },
            description: 'Shows clear button to reset date selection',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the date picker',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        enableDate: {
            description: 'Configuration for enabling/disabling specific dates (function or options object)',
            table: {
                type: { summary: 'EnableDateOptions | EnableDateFunction' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        enableTime: {
            description: 'Configuration for enabling/disabling specific times (function or options object)',
            table: {
                type: { summary: 'EnableTimeOptions | EnableTimeFunction' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        open: {
            control: { type: 'boolean' },
            description: 'Controls whether the picker dropdown is open',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        time: {
            control: { type: 'boolean' },
            description: 'Enables time selection in addition to date',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        date: {
            description: 'Selected date value',
            table: {
                type: { summary: 'Date | string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        format: {
            control: { type: 'text' },
            description: 'Date format for display',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"dd.MM.yyyy"' },
                category: 'Inputs',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text when no date is selected',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the input element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        dateChange: {
            description: 'Emits when date selection changes',
            table: {
                type: { summary: 'EventEmitter<Date>' },
                category: 'Outputs',
            },
        },
        openChange: {
            description: 'Emits when picker dropdown open state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        format: 'yyyy.MM.dd HH:mm',
        placeholder: 'yyyy.MM.dd HH:mm',
        enableDate: {
            onlyWorkDays: false,
        },
        enableTime: {
            onlyWorkHours: true,
        },
        name: 'custom-name',
        time: true,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-date-picker
      [clearButton]="clearButton"
      [disabled]="disabled"
      [enableDate]="enableDate"
      [enableTime]="enableTime"
      [placeholder]="placeholder"
      [time]="time"
      [format]="format"
      [open]="open"
      [name]="name">
    </spy-date-picker>
  `,
});

export const disabledTimeViaFunction = (args) => ({
    props: args,
    template: `
    <spy-date-picker
      [clearButton]="clearButton"
      [disabled]="disabled"
      [enableDate]="enableDate"
      [enableTime]="enableTime"
      [placeholder]="placeholder"
      [time]="time"
      [format]="format"
      [open]="open"
      [name]="name">
    </spy-date-picker>
  `,
});
disabledTimeViaFunction.argTypes = {
    enableTime: {
        table: {
            disable: true,
        },
    },
};
disabledTimeViaFunction.args = {
    enableTime: () => ({
        hours: () => [10, 11, 12, 13, 14, 15, 16, 17],
        minutes: () => [...Array(25).keys()],
        seconds: () => [],
    }),
};
