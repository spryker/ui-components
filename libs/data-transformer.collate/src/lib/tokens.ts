import { InjectionToken, Provider } from '@angular/core';

import { DataTransformerConfiguratorDeclaration, DataTransformerFilterDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DataTransformerConfiguratorTypesToken: InjectionToken<DataTransformerConfiguratorDeclaration[]> =
    new InjectionToken<DataTransformerConfiguratorDeclaration[]>('DataTransformerConfiguratorTypes');

export function provideDataTransformerConfiguratorTypes(
    dataConfigurators: DataTransformerConfiguratorDeclaration,
): Provider {
    return {
        provide: DataTransformerConfiguratorTypesToken,
        useValue: dataConfigurators,
        multi: true,
    };
}

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DataTransformerFiltersTypesToken: InjectionToken<DataTransformerFilterDeclaration[]> = new InjectionToken<
    DataTransformerFilterDeclaration[]
>('DataTransformerFiltersTypes');

export function provideDataTransformerFilters(filters: DataTransformerFilterDeclaration): Provider {
    return {
        provide: DataTransformerFiltersTypesToken,
        useValue: filters,
        multi: true,
    };
}
