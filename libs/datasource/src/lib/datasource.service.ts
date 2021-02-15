import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { DatasourceTypesToken } from './token';
import {
  Datasource,
  DatasourceConfig,
  DatasourceRegistry,
  DatasourceType,
  DatasourceTypesDeclaration,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  dataSources: DatasourceTypesDeclaration = this.dataSourceTypes?.reduce(
    (dataSources, dataSource) => ({ ...dataSources, ...dataSource }),
    {},
  );

  constructor(
    @Inject(DatasourceTypesToken)
    private dataSourceTypes: InjectionTokenType<typeof DatasourceTypesToken>,
  ) {}

  resolve(
    injector: Injector,
    config: DatasourceConfig,
    context?: unknown,
  ): Observable<unknown> {
    if (!this.isDatasourceRegisteredType(config.type)) {
      throw Error(`DatasourceService: Unknown datasource type ${config.type}`);
    }

    const dataSource: Datasource<
      DatasourceConfig,
      unknown,
      unknown
    > = injector.get(this.dataSources[config.type]);

    return dataSource.resolve(injector, config, context);
  }

  private isDatasourceRegisteredType(
    type: DatasourceType,
  ): type is keyof DatasourceRegistry {
    return type in this.dataSources;
  }
}
