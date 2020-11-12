import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableData, TableDataConfig, TableDatasource } from '@spryker/table';
import { JsonHttpUrlEncodingCodec } from '@spryker/utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableDatasourceHttpConfig } from './types';

// Add http datasource type to registry
@Injectable({ providedIn: 'root' })
export class TableDatasourceHttpService
  implements TableDatasource<TableDatasourceHttpConfig> {
  constructor(private http: HttpClient) {}

  resolve(
    datasource: TableDatasourceHttpConfig,
    dataConfig$: Observable<TableDataConfig>,
  ): Observable<TableData> {
    return dataConfig$.pipe(
      switchMap((config) => {
        for (const key in config) {
          if (config[key] === undefined) {
            delete config[key];
          }
        }

        const params = new HttpParams({
          fromObject: config as any, // any values can be used and custom codec supports it
          encoder: new JsonHttpUrlEncodingCodec(),
        });

        return this.http.get<TableData>(datasource.url, { params });
      }),
    );
  }
}
