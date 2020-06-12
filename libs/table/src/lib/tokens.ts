import { InjectionToken, Provider } from '@angular/core';
import { TableActionsDeclaration } from './types';

export const TableActionsToken = new InjectionToken<TableActionsDeclaration[]>(
  'TableActionsToken',
);

export function provideTableActionsServices(
  actions: TableActionsDeclaration,
): Provider {
  return {
    provide: TableActionsToken,
    useValue: actions,
    multi: true,
  };
}
