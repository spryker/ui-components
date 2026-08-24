import { InjectionToken, Provider } from '@angular/core';
import { ActionTypesDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const ActionTypesToken: InjectionToken<ActionTypesDeclaration[]> = new InjectionToken<ActionTypesDeclaration[]>(
    'ActionsToken',
);

export function provideActions(actions: ActionTypesDeclaration): Provider {
    return {
        provide: ActionTypesToken,
        useValue: actions,
        multi: true,
    };
}
