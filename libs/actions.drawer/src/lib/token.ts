import { InjectionToken, Provider } from '@angular/core';
import { DrawerActionTypesDeclaration } from './types';

export const DrawerActionComponentTypesToken = new InjectionToken<DrawerActionTypesDeclaration[]>(
    'DrawerActionComponentTypesToken',
);

export function provideDrawerActionType(components: DrawerActionTypesDeclaration): Provider {
    return {
        provide: DrawerActionComponentTypesToken,
        useValue: components,
        multi: true,
    };
}
