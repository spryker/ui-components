import { InjectionToken, Provider } from '@angular/core';

import { DatasourceTypesDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DatasourceTypesToken: InjectionToken<DatasourceTypesDeclaration[]> = new InjectionToken<
    DatasourceTypesDeclaration[]
>('DatasourceTypes');

export function provideDatasources(datasources: DatasourceTypesDeclaration): Provider {
    return {
        provide: DatasourceTypesToken,
        useValue: datasources,
        multi: true,
    };
}
