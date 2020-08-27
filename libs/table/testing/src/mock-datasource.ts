import {
  Injectable,
  Injector,
  InjectionToken,
  Inject,
  Optional,
} from '@angular/core';
import {
  TableData,
  TableDataConfig,
  TableDatasource,
  TableDatasourceConfig,
} from '@spryker/table';
import { Observable, of } from 'rxjs';

import {
  TableDataMockGenerator,
  generateMockTableDataForOptions,
} from './mock-data';
import { switchMap } from 'rxjs/operators';
import { InjectionTokenType } from '@spryker/utils';

export const MockTableDatasourceToken = new InjectionToken<
  TableDataMockGenerator
>('MockTableDatasource');

export interface MockTableDatasourceConfig extends TableDatasourceConfig {
  dataGenerator?: TableDataMockGenerator;
}

@Injectable({ providedIn: 'root' })
export class MockTableDatasourceService
  implements TableDatasource<MockTableDatasourceConfig> {
  constructor(
    @Inject(MockTableDatasourceToken)
    @Optional()
    private dataGenerator?: InjectionTokenType<typeof MockTableDatasourceToken>,
  ) {}

  resolve(
    datasource: MockTableDatasourceConfig,
    dataConfig$: Observable<TableDataConfig>,
    injector: Injector,
  ): Observable<TableData> {
    const dataGenerator =
      datasource.dataGenerator ?? this.dataGenerator ?? (() => ({}));

    return dataConfig$.pipe(
      switchMap(config =>
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
