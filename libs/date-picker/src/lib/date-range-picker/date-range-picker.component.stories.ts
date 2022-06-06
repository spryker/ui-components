import { DateRangePickerModule } from './date-range-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';
import { boolean } from '@storybook/addon-knobs';

export default {
    title: 'DateRangePickerComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [
            DateRangePickerModule,
            BrowserAnimationsModule,
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
        ],
    },
    template: `
    <spy-date-range-picker
        [time]="time"
        format="yyyy.MM.dd HH:mm"
        placeholderFrom="from"
        placeholderTo="to"
    ></spy-date-range-picker>
  `,
    props: {
        time: boolean('Enable time', true),
    },
});
