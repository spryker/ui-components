import { InjectionToken, Provider } from '@angular/core';

import { TableDatasourceTypesDeclaration } from '../table/table';

/**
 * Multi-provider that holds all datasource type services of table
 */
export const TableDatasourceTypesToken = new InjectionToken<
  TableDatasourceTypesDeclaration[]
  >('TableDatasourceTypesToken');

export function provideTableDatasourceServices(
  datasourceTypes: TableDatasourceTypesDeclaration,
): Provider {
  return {
    provide: TableDatasourceTypesToken,
    useValue: datasourceTypes,
    multi: true,
  };
}
