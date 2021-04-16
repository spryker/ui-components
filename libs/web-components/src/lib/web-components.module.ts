import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ComponentSelectorStrategy,
  PrefixComponentSelectorStrategy,
  PrefixComponentSelectorStrategyOptions,
} from 'ngx-element-boundary';

import {
  CustomElementComponentsInitProvider,
  CustomElementOptions,
  provideCustomElementComponents,
  WebComponentDefs,
} from './custom-element';

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
        CustomElementComponentsInitProvider,
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
      providers: [
        CustomElementComponentsInitProvider,
        provideCustomElementComponents(components),
      ],
    };
  }
}
