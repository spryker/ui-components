import { Injectable } from '@angular/core';
import { TableData } from '@spryker/table';
import { Observable, of } from 'rxjs';

import { TableDatasourceStaticConfig } from './types';

// Add static datasource type to registry
@Injectable({ providedIn: 'root' })
export class TableDatasourceStaticService {
  resolve(datasource: TableDatasourceStaticConfig): Observable<TableData> {
    return of({
      data: datasource.data,
      total: datasource.data.length,
      page: 1,
      pageSize: datasource.data.length,
    });
  }
}
