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
                import('@angular/common/locales/en').then((m) => ({
                    data: m.default,
                })),

            ant: () =>
                Promise.all([
                    import('ng-zorro-antd/i18n').then((m) => m.en_US),
                    import('date-fns/locale/en-US').then((m) => m.default),
                ]).then(([data, dateData]) => ({ data, dateData })),

            spryker: () =>
                import('@spryker/locale/data/en').then((m) => {
                    console.log(m, '@spryker/locale/data/en@spryker/locale/data/en@spryker/locale/data/en');
                    return {
                        data: m.data,
                    };
                }),
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
