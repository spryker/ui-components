import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocaleRecord, provideLocaleRecordsFactory } from '@spryker/locale';

export const TR_LOCALE = 'tr';

export function trLocaleFactory() {
    // FIXME(angular/angular#23629): Use factory with internal const to workaround AOT error
    // @see https://github.com/angular/angular/issues/23629
    const trLocale: LocaleRecord = {
        id: TR_LOCALE,
        loaders: {
            ng: () =>
                import('@angular/common/locales/tr').then((m) => ({
                    data: m.default,
                })),
            ant: () =>
                Promise.all([
                    import('node_modules/ng-zorro-antd/esm2020/i18n/languages/tr_TR' as any),
                    import('date-fns/locale/tr'),
                ]).then(([data, date]) => ({
                    data: data.default,
                    dateData: date.default,
                })),
            spryker: () =>
                import('@spryker/locale/data/tr' as any).then((m) => ({
                    data: m.data,
                })),
        },
    };
    return [trLocale];
}

@NgModule({
    imports: [CommonModule],
    providers: [provideLocaleRecordsFactory(trLocaleFactory)],
})
export class TrLocaleModule {}

export default TrLocaleModule;
