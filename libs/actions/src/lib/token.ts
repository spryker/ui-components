import { InjectionToken, Provider } from '@angular/core';
import { ActionsRegistry } from './types';
import { RegistryDeclaration } from '@spryker/utils';

export const ActionTypesToken = new InjectionToken<
  RegistryDeclaration<ActionsRegistry>[]
>('ActionsToken');

export function provideActions(
  actions: RegistryDeclaration<ActionsRegistry>,
): Provider {
  return {
    provide: ActionTypesToken,
    useValue: actions,
    multi: true,
  };
}
