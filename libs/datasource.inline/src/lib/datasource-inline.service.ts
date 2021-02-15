import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { withLatestFrom, map, delay } from 'rxjs/operators';
import {
  DatasourceInlineConfig,
  DatasourceInlineConfigPreprocessor,
  DatasourceInlineContext,
} from './types';
import { DatasourceProcessorService } from './datasource-processor.service';
import { DatasourceFilterService } from './datasource-filter.service';
import { CoreTableComponent } from 'libs/table/src';

@Injectable({
  providedIn: 'root',
})
export class DatasourceInlineService {
  constructor(
    private datasourceFilter: DatasourceFilterService,
    private datasourceProcessor: DatasourceProcessorService,
  ) {}

  resolve(
    injector: Injector,
    config: DatasourceInlineConfig,
    context?: DatasourceInlineContext,
  ): Observable<unknown> {
    const tableComponent = injector.get(CoreTableComponent);

    return of(config.data).pipe(
      map((config) => {
        const paginationConfig = context?.pagination as any;
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
    columnProcessors: DatasourceInlineConfigPreprocessor,
    data: unknown,
  ): unknown {
    return data.map((row) => {
      row = { ...row };

      Object.entries(columnProcessors).forEach(([colId, type]) => {
        const columnValue = row[colId];
        const postprocessedCol = this.datasourceProcessor.postprocess(
          type,
          columnValue,
        );

        row[colId] = postprocessedCol;
      });

      return row;
    });
  }

  private preprocessData(
    columnProcessors: DatasourceInlineConfigPreprocessor,
    data: DataRow[],
  ): DataRow[] {
    return data.map((row) => {
      row = { ...row };

      Object.entries(columnProcessors).forEach(([colId, type]) => {
        const columnValue = row[colId];
        const preprocessedCol = this.datasourceProcessor.preprocess(
          type,
          columnValue,
        );

        row[colId] = preprocessedCol;
      });

      return row;
    });
  }

  private filterData(
    datasource: DatasourceInlineConfig,
    config: DataConfig,
    data: DataRow[],
  ): DataRow[] {
    if (config.filter) {
      Object.entries(datasource.filter).forEach(([key, options]) => {
        const byValue = (config.filter as any)[key];
        const byValueToCompare = Array.isArray(byValue) ? byValue : [byValue];

        if (byValue !== null && byValue !== undefined) {
          data = this.datasourceFilter.filter(
            options.type,
            data,
            options,
            byValueToCompare,
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
        [config.search],
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
    data: DataRow[],
  ): DataRow[] {
    const slicedData = data.slice((page - 1) * pageSize, page * pageSize);

    if (slicedData.length) {
      return slicedData;
    }

    const dataWithFirstPage = data.slice(0, pageSize);

    return dataWithFirstPage;
  }
}
