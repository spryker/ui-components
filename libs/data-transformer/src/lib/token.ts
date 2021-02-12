import { InjectionToken, Provider } from '@angular/core';

import { DataTransformerTypesDeclaration } from './types';

export const DataTransformerTypesToken = new InjectionToken<
  DataTransformerTypesDeclaration[]
>('DataTransformerTypes');

export function provideDataTransformerType(
  transformers: DataTransformerTypesDeclaration,
): Provider {
  return {
    provide: DataTransformerTypesToken,
    useValue: transformers,
    multi: true,
  };
}
