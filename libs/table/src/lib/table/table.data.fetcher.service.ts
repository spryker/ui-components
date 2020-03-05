import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableData, HttpOptionsParams } from './table';
import { Observable } from 'rxjs';
import { TableDataConfiguratorService } from './table.data.configurator.service';
import { switchMap } from 'rxjs/operators';

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
          fromObject: <HttpOptionsParams>config,
        });

        return this.http.get<TableData>(dataUrl, { params });
      }),
    );
  }
}
