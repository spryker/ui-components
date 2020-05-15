import { Inject, Injectable, Injector, Optional } from '@angular/core';
import {
  TableData,
  TableDatasourceTypesDeclaration,
  TableDatasourceConfig,
} from './table';
import { Observable, of } from 'rxjs';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDatasourceTypesToken } from '../datasource-type/tokens';
import { TableDatasource } from './table';

@Injectable()
export class TableDatasourceService {
  dataSources: TableDatasourceTypesDeclaration = this.dataSourceTypes?.reduce(
    (dataSources, dataSource) => ({ ...dataSources, ...dataSource }),
    {},
  );

  constructor(
    private injector: Injector,
    private dataConfiguratorService: TableDataConfiguratorService,
    @Optional()
    @Inject(TableDatasourceTypesToken)
    private dataSourceTypes: TableDatasourceTypesDeclaration[],
  ) {}

  resolve(datasource: TableDatasourceConfig): Observable<TableData> {
    const sourceType = datasource.type;
    const sourceClass = this.dataSources?.[sourceType];

    if (!sourceType || !sourceClass) {
      return of({
        data: [],
        total: 0,
        page: 0,
        pageSize: 0,
      });
    }

    const sourceService: TableDatasource<TableDatasourceConfig> = this.injector.get(
      sourceClass,
    );

    return sourceService.resolve(
      datasource,
      this.dataConfiguratorService.config$,
      this.injector,
    );
  }
}
