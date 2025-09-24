import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerModule } from './date-range-picker.module';

export default {
    title: 'DateRangePickerComponent',
    component: DateRangePickerComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [DateRangePickerModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'clearButton',
                'disabled',
                'time',
                'format',
                'placeholderFrom',
                'placeholderTo',
                'nameFrom',
                'nameTo',
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
        time: true,
        placeholderFrom: 'From',
        placeholderTo: 'To',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-date-range-picker
        [clearButton]="clearButton"
        [disabled]="disabled"
        [time]="time"
        [format]="format"
        [placeholderFrom]="placeholderFrom"
        [placeholderTo]="placeholderTo"
        [nameFrom]="nameFrom"
        [nameTo]="nameTo"
    ></spy-date-range-picker>
  `,
});
