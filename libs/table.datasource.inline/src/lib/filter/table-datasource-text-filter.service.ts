import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';
import { TableDatasourceProcessorService } from '../table-datasource-processor.service';

import {
  TableDatasourceFilter,
  TableDatasourceFilterValue,
  TableDatasourceFilterOptions,
  TableDatasourceInlineConfigPreprocessor,
} from '../types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceTextFilter implements TableDatasourceFilter {
  constructor(private datasourceProcessor: TableDatasourceProcessorService) {}

  filter(
    data: TableDataRow[],
    options: TableDatasourceFilterOptions,
    byValue: TableDatasourceFilterValue,
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
  ): TableDataRow[] {
    const columns = Array.isArray(options.columns)
      ? options.columns
      : [options.columns];
    let byValueToCompare = byValue;
    let isValuePreprocessed = false;

    return data.filter(row => {
      const filteredRows = columns.some(column => {
        if (!isValuePreprocessed && columnProcessors?.[column]) {
          byValueToCompare = this.datasourceProcessor.preprocess(
            columnProcessors[column],
            byValueToCompare,
          );

          isValuePreprocessed = true;
        }

        return (row[column] as any).toString().includes(byValueToCompare);
      });

      return filteredRows;
    });
  }
}
