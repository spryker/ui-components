import { InjectionToken, Provider, Type } from '@angular/core';

import { UnsavedChangesGuard } from './unsaved-changes-guard';

export const UnsavedChangesRootGuardsToken = new InjectionToken<
  UnsavedChangesGuard[]
>('UnsavedChangesRootGuards');

export function provideRootGuard(guard: Type<UnsavedChangesGuard>): Provider {
  return {
    provide: UnsavedChangesRootGuardsToken,
    useExisting: guard,
    multi: true,
  };
}

export const UnsavedChangesRootToken = new InjectionToken(
  'UnsavedChangesRoot',
  {
    providedIn: 'root',
    factory: () => 'root',
  },
);
