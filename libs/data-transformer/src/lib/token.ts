import { InjectionToken, Provider } from '@angular/core';

import { DataTransformerTypesDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DataTransformerTypesToken: InjectionToken<DataTransformerTypesDeclaration[]> = new InjectionToken<
    DataTransformerTypesDeclaration[]
>('DataTransformerTypes');

export function provideDataTransformerType(transformers: DataTransformerTypesDeclaration): Provider {
    return {
        provide: DataTransformerTypesToken,
        useValue: transformers,
        multi: true,
    };
}
