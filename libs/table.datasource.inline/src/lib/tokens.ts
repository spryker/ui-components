import { InjectionToken, Provider } from '@angular/core';

import {
  TableDatasourceFiltersDeclaration,
  TableDatasourceProcessorsDeclaration,
} from './types';

export const TableDatasourceFiltersToken = new InjectionToken<
  TableDatasourceFiltersDeclaration[]
>('TableDatasourceFiltersToken');

export function provideTableDatasourceFilters(
  filters: TableDatasourceFiltersDeclaration,
): Provider {
  return {
    provide: TableDatasourceFiltersToken,
    useValue: filters,
    multi: true,
  };
}

export const TableDatasourceProcessorsToken = new InjectionToken<
  TableDatasourceProcessorsDeclaration[]
>('TableDatasourceProcessorsToken');

export function provideTableDatasourceProcessors(
  processors: TableDatasourceProcessorsDeclaration,
): Provider {
  return {
    provide: TableDatasourceProcessorsToken,
    useValue: processors,
    multi: true,
  };
}
