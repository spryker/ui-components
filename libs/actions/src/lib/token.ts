import { InjectionToken, Provider } from '@angular/core';
import { ActionTypesDeclaration } from './types';

export const ActionTypesToken = new InjectionToken<ActionTypesDeclaration[]>('ActionsToken');

export function provideActions(actions: ActionTypesDeclaration): Provider {
    return {
        provide: ActionTypesToken,
        useValue: actions,
        multi: true,
    };
}
