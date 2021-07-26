import { InjectionToken, Provider } from '@angular/core';

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
