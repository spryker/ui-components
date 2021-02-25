import { InjectionToken, Provider } from '@angular/core';

import {
  DataTransformerConfiguratorDeclaration,
  DataTransformerFilterDeclaration,
} from './types';

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
