import { Injectable, Injector } from '@angular/core';
import { DataTransformerConfigurator } from '@spryker/data-transformer-configurator';
import {
  CoreTableComponent,
  TableDataConfiguratorService,
} from '@spryker/table';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { TableDataDataConfiguratorTransformerConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDataDataConfiguratorTransformer
  implements
    DataTransformerConfigurator<TableDataDataConfiguratorTransformerConfig> {
  resolve(
    injector: Injector,
  ): Observable<TableDataDataConfiguratorTransformerConfig> {
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
