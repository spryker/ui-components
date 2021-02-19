import { Injector } from '@angular/core';
import {
  InjectableType,
  RegistryType,
  RegistryDeclaration,
} from '@spryker/utils';
import { Observable } from 'rxjs';
import { DataTransformerConfig } from '@spryker/data-transformer';

// tslint:disable-next-line: no-empty-interface
export interface DatasourceRegistry {
  // type: Datasource
}

export type DatasourceTypesDeclaration = RegistryDeclaration<
  DatasourceRegistry
>;

// 'inline'
// 'name.type' => 'table.inline'
export type DatasourceType = RegistryType<DatasourceRegistry>;

export interface DatasourceConfig {
  type: DatasourceType;
  transform: DataTransformerConfig;
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
