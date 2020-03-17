import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableData, TableDataConfig } from './table';
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
        const params = new HttpParams({
          fromObject: config,
          encoder: new JsonHttpUrlEncodingCodec(),
        } as TableDataConfig);

        return this.http.get<TableData>(dataUrl, { params });
      }),
    );
  }
}
