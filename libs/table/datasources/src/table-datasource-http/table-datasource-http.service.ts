import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableData, TableDataConfig, TableDatasourceConfig } from '@spryker/table';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JsonHttpUrlEncodingCodec } from '@spryker/utils';

// Add http datasource type to registry
declare module '@spryker/table' {
  interface TableDatasourceTypeRegistry {
    http: TableDatasourceHttpConfig;
  }
}

export interface TableDatasourceHttpConfig extends TableDatasourceConfig {
  url: string;
}

@Injectable({ providedIn: 'root' })
export class TableDatasourceHttpService {
  constructor(private http: HttpClient) {}

  resolve(datasource: TableDatasourceHttpConfig,
          dataConfig$: Observable<TableDataConfig>,
          ): Observable<TableData> {

    return dataConfig$.pipe(
      switchMap(config => {
        for (const key in config) {
          if (config[key] === undefined) {
            delete config[key];
          }
        }

        const params = new HttpParams({
          fromObject: config as any, // any values can be used and custom codec supports it
          encoder: new JsonHttpUrlEncodingCodec(),
        });
// console.log(this.http);
        return this.http.get<TableData>(datasource.url, { params });
      }),
    );
  }
}
