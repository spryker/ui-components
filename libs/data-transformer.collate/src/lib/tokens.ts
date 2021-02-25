import { InjectionToken, Provider } from '@angular/core';

import {
  DataTransformerConfiguratorDeclaration,
  DataTransformerFilterDeclaration,
} from './types';

export const DataTransformerConfiguratorTypesToken = new InjectionToken<
  DataTransformerConfiguratorDeclaration[]
>('DataTransformerConfiguratorTypes');

export function provideDataTransformerConfiguratorTypes(
  dataConfigurators: DataTransformerConfiguratorDeclaration,
): Provider {
  return {
    provide: DataTransformerConfiguratorTypesToken,
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
