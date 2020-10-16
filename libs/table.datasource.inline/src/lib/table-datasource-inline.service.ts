import { Injectable, Injector } from '@angular/core';
import {
  CoreTableComponent,
  TableData,
  TableDataConfig,
  TableDataRow,
} from '@spryker/table';
import { TablePaginationConfig } from '@spryker/table.feature.pagination';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { TableFiltrationService } from './table-filtration.service';
import { TableDatasourceInlineConfig } from './types';

// Add inline datasource type to registry
@Injectable({ providedIn: 'root' })
export class TableDatasourceInlineService {
  constructor(private filtrationService: TableFiltrationService) {}

  resolve(
    datasource: TableDatasourceInlineConfig,
    dataConfig$: Observable<TableDataConfig>,
    injector: Injector,
  ): Observable<TableData> {
    return dataConfig$.pipe(
      map(config => {
        const tableComponent = injector.get(CoreTableComponent);
        // tslint:disable-next-line: no-non-null-assertion
        const paginationConfig = tableComponent.config!
          .pagination as TablePaginationConfig;
        const pageSize =
          (config.pageSize as number) ?? paginationConfig.sizes[0];
        const page = config.page as number;
        let data = [...datasource.data];
        let total = datasource.data.length;

        if (config.filter) {
          Object.entries(datasource.filter).forEach(([key, value]) => {
            const filterByValue = (config.filter as any)[key];

            if (filterByValue !== null && filterByValue !== undefined) {
              data = this.filtrationService.filtration(
                value.type,
                data,
                value,
                filterByValue,
              );
              total = data.length;
            }
          });
        }

        if (config.search) {
          data = this.filtrationService.filtration(
            'text',
            data,
            datasource.search,
            config.search,
          );
          total = data.length;
        }

        if (pageSize) {
          data = this.dataWithPageSize(page, pageSize, data);
        }

        if (config.sortBy && config.sortDirection) {
          data.sort((a, b) => this.sort(a, b, config.sortBy as string));

          if (config.sortDirection === 'desc') {
            data.reverse();
          }
        }

        return {
          data: data,
          total: total,
          page: page,
          pageSize: pageSize,
        };
      }),
      delay(0),
    );
  }

  private sort(a: any, b: any, sortBy: string): number {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }

    return 0;
  }

  private dataWithPageSize(
    page: number,
    pageSize: number,
    data: TableDataRow[],
  ): TableDataRow[] {
    const slicedData = data.slice((page - 1) * pageSize, page * pageSize);

    if (slicedData.length) {
      return slicedData;
    }

    const dataWithFirstPage = data.slice(0, pageSize);

    return dataWithFirstPage;
  }
}
