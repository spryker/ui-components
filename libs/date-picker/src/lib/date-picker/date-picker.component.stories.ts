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
    <spy-date-picker time format="yyyy-MM-dd" date="2012-12-12"></spy-date-picker>
  `,
  props: {
    enableDate: true,
    date: new Date(),
    placeholder: '123',
  },
});
