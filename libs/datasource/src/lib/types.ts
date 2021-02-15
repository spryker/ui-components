import { Injector } from '@angular/core';
import { InjectableType } from '@spryker/utils';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface DatasourceRegistry {
  // key is DatasourceType
  // value is [T in Datasource, D? in Datasource, C? in Datasource]
  // [type: string]: [unknown, unknown, unknown?];
}

export type DatasourceTypesDeclaration = {
  [P in keyof DatasourceRegistry]?: InjectableType<
    Datasource<
      DatasourceRegistry[P][0],
      DatasourceRegistry[P][1],
      DatasourceRegistry[P][2]
    >
  >;
};

// 'inline'
// 'name.type' => 'table.inline'
export type DatasourceType = keyof DatasourceRegistry extends never
  ? string
  : keyof DatasourceRegistry;

export interface DatasourceConfig {
  type: DatasourceType;

  // Specific Datasource types may have custom props
  [k: string]: unknown;
}

export interface Datasource<
  T extends DatasourceConfig,
  D = unknown,
  C = unknown
> {
  resolve(injector: Injector, config: T, context?: C): Observable<D>;
}
