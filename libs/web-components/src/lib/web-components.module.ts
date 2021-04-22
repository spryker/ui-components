import { CommonModule } from '@angular/common';
import {
  Inject,
  Injector,
  ModuleWithProviders,
  NgModule,
  Self,
  Optional,
} from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import {
  ComponentSelectorStrategy,
  PrefixComponentSelectorStrategy,
  PrefixComponentSelectorStrategyOptions,
} from 'ngx-element-boundary';

import {
  CustomElementComponentsToken,
  CustomElementOptions,
  provideCustomElementComponents,
  WebComponentDefs,
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
  }: WebComponentsModuleOptions = {}): ModuleWithProviders<
    WebComponentsModule
  > {
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
          ? { provide: CustomElementOptions, useValue: customElementOptions }
          : [],
      ],
    };
  }

  static withComponents(
    components: WebComponentDefs,
  ): ModuleWithProviders<WebComponentsModule> {
    return {
      ngModule: WebComponentsModule,
      providers: [provideCustomElementComponents(components)],
    };
  }

  constructor(
    injector: Injector,
    @Inject(CustomElementComponentsToken)
    @Self()
    @Optional()
    components?: InjectionTokenType<typeof CustomElementComponentsToken>,
  ) {
    registerComponents(components?.flat() ?? [], injector);
  }
}
