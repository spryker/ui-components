import {
  Injectable,
  Injector,
  InjectionToken,
  Inject,
  Optional,
} from '@angular/core';
import { TableData, TableDataConfig } from '@spryker/table';
import { DatasourceConfig, Datasource } from '@spryker/datasource';
import { Observable, of } from 'rxjs';

import {
  TableDataMockGenerator,
  generateMockTableDataForOptions,
} from './mock-data';
import { switchMap, delay } from 'rxjs/operators';
import { InjectionTokenType } from '@spryker/utils';

export const MockTableDatasourceToken =
  new InjectionToken<TableDataMockGenerator>('MockTableDatasource');

export interface MockTableDatasourceConfig extends DatasourceConfig {
  dataGenerator?: TableDataMockGenerator;
}

@Injectable({ providedIn: 'root' })
export class MockTableDatasourceService
  implements Datasource<TableData, TableDataConfig>
{
  constructor(
    @Inject(MockTableDatasourceToken)
    @Optional()
    private dataGenerator?: InjectionTokenType<typeof MockTableDatasourceToken>,
  ) {}

  resolve(
    injector: Injector,
    datasource: MockTableDatasourceConfig,
    context: TableDataConfig,
  ): Observable<TableData> {
    const dataGenerator =
      datasource.dataGenerator ?? this.dataGenerator ?? (() => ({}));

    return of(context).pipe(
      delay(0),
      switchMap((config) =>
        of(
          generateMockTableDataForOptions(
            {
              page: config.page != null ? Number(config.page) : undefined,
              pageSize:
                config.pageSize != null ? Number(config.pageSize) : undefined,
            },
            dataGenerator,
          ),
        ),
      ),
    );
  }
}
