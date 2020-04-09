import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideLocaleRecords } from '@spryker/locale';

export const EN_LOCALE = 'en-US';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideLocaleRecords([
      {
        id: EN_LOCALE,
        loaders: {
          ng: () =>
            import('@angular/common/locales/en').then(m => ({
              data: m.default,
            })),
          ant: () =>
            import('ng-zorro-antd/esm5/i18n/languages/en_US' as any).then(
              m => ({
                data: m.default,
              }),
            ),
        },
      },
    ]),
  ],
})
export class EnLocaleModule {}

export default EnLocaleModule;
