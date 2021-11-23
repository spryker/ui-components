import { Injector } from '@angular/core';
import { DataTransformerConfig } from '@spryker/data-transformer';
import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface DatasourceRegistry {
  // type: Datasource
}

// 'inline'
// 'name.type' => 'table.inline'
export type DatasourceType = RegistryType<DatasourceRegistry>;

export type DatasourceTypesDeclaration =
  RegistryDeclaration<DatasourceRegistry>;

export interface DatasourceConfig {
  type: DatasourceType;
  transform?: DataTransformerConfig;
  // Specific Datasource types may have custom props
  [k: string]: unknown;
}

export interface Datasource<D = unknown, C = unknown> {
  resolve(
    injector: Injector,
    config: DatasourceConfig,
    context?: C,
  ): Observable<D>;
}
