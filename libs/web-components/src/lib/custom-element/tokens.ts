import {
  APP_INITIALIZER,
  InjectionToken,
  Injector,
  Provider,
} from '@angular/core';

import { registerComponents } from './custom-element-registry';
import { WebComponentDefs } from './types';

export const CustomElementComponentsToken = new InjectionToken<
  WebComponentDefs[]
>('CustomElementComponents');

export function provideCustomElementComponents(
  components: WebComponentDefs,
): Provider {
  return {
    provide: CustomElementComponentsToken,
    useValue: components,
    multi: true,
  };
}

export function initCustomElementComponentsFactory(injector: Injector) {
  const components = injector.get(CustomElementComponentsToken, []).flat();
  return () => registerComponents(components, injector);
}

export const CustomElementComponentsInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initCustomElementComponentsFactory,
  deps: [Injector],
  multi: true,
};
