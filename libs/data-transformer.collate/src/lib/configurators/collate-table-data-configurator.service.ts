import { Injectable, Injector } from '@angular/core';
import {
  CoreTableComponent,
  TableDataConfiguratorService,
} from '@spryker/table';
import { Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

import { CollateDataConfig, CollateDataConfigurator } from '../types';

@Injectable({ providedIn: 'root' })
export class CollateTableDataConfigurator implements CollateDataConfigurator {
  resolve(injector: Injector): Observable<CollateDataConfig> {
    const tableComponent = injector.get(CoreTableComponent);
    const dataConfig$ = injector.get(TableDataConfiguratorService).config$;

    return dataConfig$.pipe(
      withLatestFrom(tableComponent.config$),
      map(([config, tableConfig]) => {
        const paginationConfig = tableConfig.pagination as any;
        const defaultPaginationSize = paginationConfig
          ? paginationConfig.sizes[0]
          : undefined;
        const pageSize = (config.pageSize as number) ?? defaultPaginationSize;
        const page = config.page as number;

        return {
          search: config.search,
          filter: config.filter,
          sorting: {
            sortBy: String(config.sortBy),
            sortDirection: String(config.sortDirection),
          },
          page,
          pageSize,
        };
      }),
    );
  }
}
