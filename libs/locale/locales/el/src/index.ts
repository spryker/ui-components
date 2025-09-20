import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocaleRecord, provideLocaleRecordsFactory } from '@spryker/locale';

export const EL_LOCALE = 'el';

export function elLocaleFactory() {
    // FIXME(angular/angular#23629): Use factory with internal const to workaround AOT error
    // @see https://github.com/angular/angular/issues/23629
    const elLocale: LocaleRecord = {
        id: EL_LOCALE,
        loaders: {
            ng: () =>
                import('@angular/common/locales/el').then((m) => ({
                    data: m.default,
                })),

            ant: () =>
                Promise.all([
                    import('ng-zorro-antd/i18n').then((m) => m.el_GR),
                    import('date-fns/locale/el').then((m) => m.default),
                ]).then(([data, dateData]) => ({ data, dateData })),

            spryker: () =>
                import('@spryker/locale/data/el' as any).then((m) => ({
                    data: m.data,
                })),
        },
    };
    return [elLocale];
}

@NgModule({
    imports: [CommonModule],
    providers: [provideLocaleRecordsFactory(elLocaleFactory)],
})
export class ElLocaleModule {}

export default ElLocaleModule;
