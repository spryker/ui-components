import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideLocaleRecords } from '@spryker/locale';

export const DE_LOCALE = 'de-DE';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideLocaleRecords([
      {
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
            import('ng-zorro-antd/esm5/i18n/languages/de_DE' as any).then(
              m => ({
                data: m.default,
              }),
            ),
        },
      },
    ]),
  ],
})
export class DeLocaleModule {}

export default DeLocaleModule;
