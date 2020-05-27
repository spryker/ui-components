import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocaleRecord, provideLocaleRecordsFactory } from '@spryker/locale';

export const EN_LOCALE = 'en';

export function enLocaleFactory() {
  // FIXME(angular/angular#23629): Use factory with internal const to workaround AOT error
  // @see https://github.com/angular/angular/issues/23629
  const enLocale: LocaleRecord = {
    id: EN_LOCALE,
    loaders: {
      ng: () =>
        import('@angular/common/locales/en').then(m => ({
          data: m.default,
        })),
      ant: () =>
        import('ng-zorro-antd/esm5/i18n/languages/en_US' as any).then(m => ({
          data: m.default,
        })),
      spryker: () =>
        import('@spryker/locale/data/en' as any).then(m => ({
          data: m.data,
        })),
    },
  };
  return [enLocale];
}

@NgModule({
  imports: [CommonModule],
  providers: [provideLocaleRecordsFactory(enLocaleFactory)],
})
export class EnLocaleModule {}

export default EnLocaleModule;
