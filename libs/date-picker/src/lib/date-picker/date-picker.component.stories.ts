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
    <spy-date-picker date="2012-12-12" placeholder="123" open="true"></spy-date-picker>
  `,
  props: {},
});
