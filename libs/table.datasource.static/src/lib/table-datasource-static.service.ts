import { Injectable } from '@angular/core';
import { TableData, TableDatasource } from '@spryker/table';
import { TableDatasourceStaticConfig } from './types';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableDatasourceStaticService
  implements TableDatasource<TableDatasourceStaticConfig> {
  resolve(datasource: TableDatasourceStaticConfig): Observable<TableData> {
    return of({
      data: datasource.data,
      total: datasource.data.length,
      page: 1,
      pageSize: datasource.data.length,
    });
  }
}
