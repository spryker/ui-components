import { InjectionToken, Provider } from '@angular/core';

import {
  DatasourceFiltersDeclaration,
  DatasourceProcessorsDeclaration,
} from './types';

export const DatasourceFiltersToken = new InjectionToken<
  DatasourceFiltersDeclaration[]
>('DatasourceFiltersToken');

export function provideDatasourceFilters(
  filters: DatasourceFiltersDeclaration,
): Provider {
  return {
    provide: DatasourceFiltersToken,
    useValue: filters,
    multi: true,
  };
}

export const DatasourceProcessorsToken = new InjectionToken<
  DatasourceProcessorsDeclaration[]
>('DatasourceProcessorsToken');

export function provideDatasourceProcessors(
  processors: DatasourceProcessorsDeclaration,
): Provider {
  return {
    provide: DatasourceProcessorsToken,
    useValue: processors,
    multi: true,
  };
}
