import { DatePickerModule } from '../date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';

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
      time="HH:mm"
      format="yyyy.MM.dd HH:mm">
    </spy-date-picker>
  `,
  props: {
    enableTimeObj: {
      onlyWorkHours: true,
      from: '2020.11.06 20:30',
      to: '2020.11.06 23:30',
    },
    enableTimeFunc: () => {
      return {
        hours: () => [10, 11, 12, 13, 14, 15, 16, 17],
        minutes: () => new Array(25).fill(null).map((_, index) => index),
        seconds: () => [],
      };
    },
  },
});
