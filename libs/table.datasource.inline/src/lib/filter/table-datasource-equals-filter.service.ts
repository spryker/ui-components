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
 * Filters data by value that strictly equals to the column value.
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
    const processedColumns: Record<string, unknown[]> = columns.reduce(
      (allColumns, column) => {
        const processedValue = columnProcessors[column]
          ? byValue.map(valueToCompare =>
              this.datasourceProcessor.preprocess(
                columnProcessors[column],
                valueToCompare,
              ),
            )
          : byValue;

        return {
          ...allColumns,
          [column]: processedValue,
        };
      },
      {},
    );

    return data.filter(row =>
      columns.some(column => {
        if (!byValue.length) {
          return true;
        }

        return processedColumns?.[column].includes(row[column]);
      }),
    );
  }
}
