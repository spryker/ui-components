import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableData } from './table';
import { Observable } from 'rxjs';
import { TableDataConfiguratorService } from './data-configurator.service';
import { switchMap } from 'rxjs/operators';
import { JsonHttpUrlEncodingCodec } from '@spryker/utils';

@Injectable()
export class TableDataFetcherService {
  constructor(
    private http: HttpClient,
    private dataConfiguratorService: TableDataConfiguratorService,
  ) {}

  resolve(dataUrl: string): Observable<TableData> {
    return this.dataConfiguratorService.config$.pipe(
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

        return this.http.get<TableData>(dataUrl, { params });
      }),
    );
  }
}
