import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule, inject } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import {
    ComponentSelectorStrategy,
    PrefixComponentSelectorStrategy,
    PrefixComponentSelectorStrategyOptions,
} from 'ngx-element-boundary';

import {
    CustomElementOptions,
    provideCustomElementComponents,
    WebComponentDefs,
    CustomElementComponentsToken,
} from './custom-element';
import { registerComponents } from './custom-element/custom-element-registry';

export interface WebComponentsModuleOptions {
    customElementOptions?: CustomElementOptions;
}

@NgModule({
    imports: [CommonModule],
})
export class WebComponentsModule {
    static forRoot({
        customElementOptions,
    }: WebComponentsModuleOptions = {}): ModuleWithProviders<WebComponentsModule> {
        return {
            ngModule: WebComponentsModule,
            providers: [
                {
                    provide: ComponentSelectorStrategy,
                    useClass: PrefixComponentSelectorStrategy,
                },
                {
                    provide: PrefixComponentSelectorStrategyOptions,
                    useExisting: CustomElementOptions,
                },
                customElementOptions
                    ? {
                          provide: CustomElementOptions,
                          useValue: customElementOptions,
                      }
                    : [],
            ],
        };
    }

    static withComponents(components: WebComponentDefs): ModuleWithProviders<WebComponentsModule> {
        return {
            ngModule: WebComponentsModule,
            providers: [provideCustomElementComponents(components)],
        };
    }

    constructor() {
        const injector = inject(Injector);
        const components = inject<InjectionTokenType<typeof CustomElementComponentsToken>>(
            CustomElementComponentsToken,
            { self: true, optional: true },
        );

        registerComponents(components?.flat() ?? [], injector);
    }
}
