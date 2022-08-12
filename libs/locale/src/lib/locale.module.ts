import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AntRegistrarService } from './loader-registrars/ant-registrar.service';
import { NgRegistrarService } from './loader-registrars/ng-registrar.service';
import { SprykerRegistrarService } from './loader-registrars/spryker-registrar.service';
import { LocaleRenderDirective } from './locale-render/locale-render.directive';
import { LocaleSwitcherComponent } from './locale-switcher/locale-switcher.component';
import { provideDefaultLocale, provideLocaleId, provideLocaleLoaderRegistrars } from './providers';
import { LocaleLoaderRegistrarMap } from './types';

export interface LocaleModuleOptions {
    defaultLocale?: string;
    registrars?: Partial<LocaleLoaderRegistrarMap>;
}

@NgModule({
    imports: [CommonModule],
    exports: [LocaleRenderDirective, LocaleSwitcherComponent],
    declarations: [LocaleRenderDirective, LocaleSwitcherComponent],
})
export class LocaleModule {
    static forRoot({ defaultLocale, registrars }: LocaleModuleOptions = {}): ModuleWithProviders<LocaleModule> {
        return {
            ngModule: LocaleModule,
            providers: [
                provideLocaleId(),
                // Default Registrars
                provideLocaleLoaderRegistrars({
                    ng: NgRegistrarService,
                    ant: AntRegistrarService,
                    spryker: SprykerRegistrarService,
                }),
                defaultLocale ? provideDefaultLocale(defaultLocale) : [],
                registrars ? provideLocaleLoaderRegistrars(registrars) : [],
            ],
        };
    }
}
