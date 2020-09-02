import { DatePickerModule } from '../date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';
import { NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { enUS } from 'date-fns/locale';

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
    providers: [
      // Set the value of NZ_DATE_LOCALE in the application root module to activate date-fns mode
      { provide: NZ_DATE_LOCALE, useValue: enUS },
    ],
  },
  template: `
    <spy-date-picker date="2012-12-12" placeholder="123" open="true"></spy-date-picker>
  `,
  props: {},
});
