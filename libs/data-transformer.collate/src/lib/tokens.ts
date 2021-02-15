import { InjectionToken, Provider } from '@angular/core';
import {
  CollateFiltersDeclaration,
  CollateDataConfiguratorsDeclaration,
} from './types';

export const CollateFiltersTypesToken = new InjectionToken<
  CollateFiltersDeclaration[]
>('CollateFiltersTypes');

export const CollateDataConfiguratorTypesToken = new InjectionToken<
  CollateDataConfiguratorsDeclaration[]
>('CollateDataConfiguratorTypes');

export function provideCollateFilters(
  filters: CollateFiltersDeclaration,
): Provider {
  return {
    provide: CollateFiltersTypesToken,
    useValue: filters,
    multi: true,
  };
}

export function provideCollateDataConfiguratorTypes(
  dataConfigurators: CollateDataConfiguratorsDeclaration,
): Provider {
  return {
    provide: CollateDataConfiguratorTypesToken,
    useValue: dataConfigurators,
    multi: true,
  };
}
