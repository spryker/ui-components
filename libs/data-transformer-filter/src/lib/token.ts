import { InjectionToken, Provider } from '@angular/core';

import { DataTransformerFiltersDeclaration } from './types';

export const DataTransformerFiltersTypesToken = new InjectionToken<
  DataTransformerFiltersDeclaration[]
>('DataTransformerFiltersTypes');

export function provideDataTransformerFilters(
  filters: DataTransformerFiltersDeclaration,
): Provider {
  return {
    provide: DataTransformerFiltersTypesToken,
    useValue: filters,
    multi: true,
  };
}
