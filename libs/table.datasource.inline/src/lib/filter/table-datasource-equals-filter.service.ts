import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';
import { TableDatasourceProcessorService } from '../table-datasource-processor.service';

import {
  TableDatasourceFilter,
  TableDatasourceFilterValue,
  TableDatasourceFilterOptions,
  TableDatasourceInlineConfigPreprocessor,
} from '../types';

/**
 * Filters data by value that matches the column value.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceEqualsFilter implements TableDatasourceFilter {
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
    let byValueToCompare = Array.isArray(byValue) ? byValue : [byValue];
    let isValuePreprocessed = false;

    return data.filter(row => {
      const filteredRows = columns.filter(column => {
        if (!byValueToCompare.length) {
          return true;
        }

        if (!isValuePreprocessed && columnProcessors?.[column]) {
          byValueToCompare = byValueToCompare.map(valueToCompare =>
            this.datasourceProcessor.preprocess(
              columnProcessors[column],
              valueToCompare,
            ),
          );

          isValuePreprocessed = true;
        }

        return byValueToCompare.includes(row[column]);
      });

      return filteredRows.length;
    });
  }
}
