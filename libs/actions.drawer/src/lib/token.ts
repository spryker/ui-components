import { InjectionToken, Provider } from '@angular/core';
import { DrawerActionTypesDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DrawerActionComponentTypesToken: InjectionToken<DrawerActionTypesDeclaration[]> = new InjectionToken<
    DrawerActionTypesDeclaration[]
>('DrawerActionComponentTypesToken');

export function provideDrawerActionType(components: DrawerActionTypesDeclaration): Provider {
    return {
        provide: DrawerActionComponentTypesToken,
        useValue: components,
        multi: true,
    };
}
