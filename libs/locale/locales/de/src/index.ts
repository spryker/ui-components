import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocaleRecord, provideLocaleRecordsFactory } from '@spryker/locale';

export const DE_LOCALE = 'de';

export function deLocaleFactory() {
  // FIXME(angular/angular#23629): Use factory with internal const to workaround AOT error
  // @see https://github.com/angular/angular/issues/23629
  const deLocale: LocaleRecord = {
    id: DE_LOCALE,
    loaders: {
      ng: () =>
        Promise.all([
          import('@angular/common/locales/de'),
          import('@angular/common/locales/extra/de'),
        ]).then(([data, extra]) => ({
          data: data.default,
          extraData: extra.default,
        })),
      ant: () =>
        import('ng-zorro-antd/esm5/i18n/languages/de_DE' as any).then(m => ({
          data: m.default,
        })),
      spryker: () =>
        import('@spryker/locale/data/de' as any).then(m => ({
          data: m.default,
        })),
    },
  };
  return [deLocale];
}

@NgModule({
  imports: [CommonModule],
  providers: [provideLocaleRecordsFactory(deLocaleFactory)],
})
export class DeLocaleModule {}

export default DeLocaleModule;
