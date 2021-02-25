import { InjectionToken, Provider } from '@angular/core';

import {
  DataTransformerTypesDeclaration,
  DataTransformerConfiguratorDeclaration,
  DataTransformerFilterDeclaration,
} from './types';

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

export const DataTransformerConfiguratorToken = new InjectionToken<
  DataTransformerConfiguratorDeclaration[]
>('DataTransformerConfiguratorTypes');

export function provideDataTransformerConfiguratorTypes(
  dataConfigurators: DataTransformerConfiguratorDeclaration,
): Provider {
  return {
    provide: DataTransformerConfiguratorToken,
    useValue: dataConfigurators,
    multi: true,
  };
}

export const DataTransformerFiltersTypesToken = new InjectionToken<
  DataTransformerFilterDeclaration[]
>('DataTransformerFiltersTypes');

export function provideDataTransformerFilters(
  filters: DataTransformerFilterDeclaration,
): Provider {
  return {
    provide: DataTransformerFiltersTypesToken,
    useValue: filters,
    multi: true,
  };
}
