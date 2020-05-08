import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { TableData, TableDatasourceTypesDeclaration, TableDatasourceConfig } from './table';
import { Observable, of } from 'rxjs';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDatasourceTypesToken } from '../datasource-type/tokens';

@Injectable()
export class TableDatasourceService {
  constructor(
    private injector: Injector,
    private dataConfiguratorService: TableDataConfiguratorService,
    @Optional()
    @Inject(TableDatasourceTypesToken)
    private dataSourceTypes: TableDatasourceTypesDeclaration[],
  ) {}

  resolve(datasource: TableDatasourceConfig): Observable<TableData> {
    const dataTypes = this.dataSourceTypes?.flat();

    if (!dataTypes) {
      return of([]) as unknown as Observable<TableData>;
    }

    const sourceType = datasource.type;
    const sourceClass = new (this.dataSourceTypes as any)[0][sourceType];

    return sourceClass.resolve(datasource, this.dataConfiguratorService.config$, this.injector);
  }
}
