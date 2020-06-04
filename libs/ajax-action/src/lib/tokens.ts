import { InjectionToken, Provider } from '@angular/core';
import { AjaxPostActionsDeclaration } from './types';

/**
 * Multi-token that contains all ajax actions
 */
export const AjaxPostActionsToken = new InjectionToken<
  AjaxPostActionsDeclaration[]
>('AjaxPostActionsToken');

export function provideAjaxActions(
  registry: AjaxPostActionsDeclaration,
): Provider {
  return {
    provide: AjaxPostActionsToken,
    useValue: registry,
    multi: true,
  };
}
