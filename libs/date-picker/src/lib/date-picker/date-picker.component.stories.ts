import { DatePickerModule } from '../date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';
import { boolean } from '@storybook/addon-knobs';

export default {
    title: 'DatePickerComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [
            DatePickerModule,
            BrowserAnimationsModule,
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
        ],
    },
    template: `
    <spy-date-picker
      [enableTime]="enableTimeObj"
      placeholder="yyyy.mm.dd hh:mm"
      [time]="time"
      format="yyyy.MM.dd HH:mm">
    </spy-date-picker>
  `,
    props: {
        time: boolean('Enable time', true),
        enableTimeObj: {
            onlyWorkHours: false,
            from: '2020.11.06 20:30',
            to: '2020.11.06 23:30',
        },
    },
});

export const disabledTimeViaFunction = () => ({
    moduleMetadata: {
        imports: [
            DatePickerModule,
            BrowserAnimationsModule,
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
        ],
    },
    template: `
    <spy-date-picker
      [enableTime]="enableTimeFunc"
      placeholder="yyyy.mm.dd hh:mm"
      [time]="time"
      format="yyyy.MM.dd HH:mm">
    </spy-date-picker>
  `,
    props: {
        time: boolean('Enable time', true),
        enableTimeFunc: () => ({
            hours: () => [10, 11, 12, 13, 14, 15, 16, 17],
            minutes: () => [...Array(25).keys()],
            seconds: () => [],
        }),
    },
});
