import { Injectable, Injector } from '@angular/core';
import {
  CoreTableComponent,
  TableData,
  TableDataConfig,
  TableDataRow,
  TableDatasource,
} from '@spryker/table';
import { Observable } from 'rxjs';
import { delay, map, withLatestFrom } from 'rxjs/operators';

import { TableDatasourceFilterService } from './table-datasource-filter.service';
import { TableDatasourceProcessorService } from './table-datasource-processor.service';
import {
  TableDatasourceInlineConfig,
  TableDatasourceInlineConfigPreprocessor,
} from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceInlineService
  implements TableDatasource<TableDatasourceInlineConfig> {
  constructor(
    private datasourceFilter: TableDatasourceFilterService,
    private datasourceProcessor: TableDatasourceProcessorService,
  ) {}

  resolve(
    datasource: TableDatasourceInlineConfig,
    dataConfig$: Observable<TableDataConfig>,
    injector: Injector,
  ): Observable<TableData> {
    const tableComponent = injector.get(CoreTableComponent);

    return dataConfig$.pipe(
      withLatestFrom(tableComponent.config$),
      map(([config, tableConfig]) => {
        const paginationConfig = tableConfig.pagination as any;
        const defaultPaginationSize = paginationConfig
          ? paginationConfig.sizes[0]
          : undefined;
        const pageSize = (config.pageSize as number) ?? defaultPaginationSize;
        const page = config.page as number;
        const withPreprocessing =
          datasource.columnProcessors &&
          (config.filter ||
            config.search ||
            (config.sortBy && config.sortDirection));
        let data = [...datasource.data];

        if (withPreprocessing) {
          data = this.preprocessData(datasource.columnProcessors, data);
        }

        data = this.filterData(datasource, config, data);

        const total = data.length;

        if (pageSize) {
          data = this.paginateData(page, pageSize, data);
        }

        if (config.sortBy && config.sortDirection) {
          data.sort((a, b) => {
            const comparison = this.sortData(a, b, config.sortBy as string);

            return config.sortDirection === 'desc'
              ? comparison * -1
              : comparison;
          });
        }

        if (withPreprocessing) {
          data = this.postprocessData(datasource.columnProcessors, data);
        }

        return {
          data,
          total,
          page,
          pageSize: pageSize ?? data.length,
        };
      }),
      delay(0),
    );
  }

  private postprocessData(
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
    data: TableDataRow[],
  ): TableDataRow[] {
    Object.entries(columnProcessors).forEach(([colId, type]) => {
      data = data.map(row => {
        const columnValue = row[colId];
        row[colId] = this.datasourceProcessor.postprocess(type, columnValue);

        return row;
      });
    });

    return data;
  }

  private preprocessData(
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
    data: TableDataRow[],
  ): TableDataRow[] {
    Object.entries(columnProcessors).forEach(([colId, type]) => {
      data = data.map(row => {
        const columnValue = row[colId];
        row[colId] = this.datasourceProcessor.preprocess(type, columnValue);

        return row;
      });
    });

    return data;
  }

  private filterData(
    datasource: TableDatasourceInlineConfig,
    config: TableDataConfig,
    data: TableDataRow[],
  ): TableDataRow[] {
    if (config.filter) {
      Object.entries(datasource.filter).forEach(([key, options]) => {
        const byValue = (config.filter as any)[key];

        if (byValue !== null && byValue !== undefined) {
          data = this.datasourceFilter.filter(
            options.type,
            data,
            options,
            byValue,
            datasource.columnProcessors,
          );
        }
      });
    }

    if (config.search) {
      data = this.datasourceFilter.filter(
        'text',
        data,
        datasource.search,
        config.search,
        datasource.columnProcessors,
      );
    }

    return data;
  }

  private sortData(a: any, b: any, sortBy: string): number {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }

    return 0;
  }

  private paginateData(
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
