import { DateRangePickerModule } from './date-range-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';

export default {
  title: 'DateRangePickerComponent',
};

const dates = {
  from: '2012-12-12',
  to: '2019-12-12',
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
        [dates]="dates"
        placeholderFrom="from"
        placeholderTo="to"
    ></spy-date-range-picker>
  `,
  props: {
    dates: {
      from: new Date('2012-12-15'),
      to: new Date('2012-12-18'),
    },
  },
});
