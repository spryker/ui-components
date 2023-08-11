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
