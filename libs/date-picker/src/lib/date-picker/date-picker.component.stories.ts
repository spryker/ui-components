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
      onlyWorkHours: false,
      from: new Date().setHours(9, 0, 0),
      to: new Date().setHours(18, 0, 0),
    },
    enableTimeFunc: () => {
      return {
        hours: () => [10, 11, 12, 13, 14, 15, 16, 17],
        minutes: () => new Array(60).fill(null).map((_, index) => index),
        seconds: () => new Array(60).fill(null).map((_, index) => index),
      };
    },
  },
});
