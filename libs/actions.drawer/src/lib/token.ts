import { InjectionToken, Provider } from '@angular/core';
import { DrawerActionComponentsRegistry } from './types';
import { RegistryDeclaration } from '@spryker/utils';

export const DrawerActionComponentTypesToken = new InjectionToken<
  RegistryDeclaration<DrawerActionComponentsRegistry>[]
  >('DrawerActionComponentTypesToken');

export function provideDrawerActionType(
  components: RegistryDeclaration<DrawerActionComponentsRegistry>,
): Provider {
  return {
    provide: DrawerActionComponentTypesToken,
    useValue: components,
    multi: true,
  };
}
