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
 * Filters data by value that matches with the column value.
 */
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
    const processedValuesByColumns: Record<string, unknown[]> = columns.reduce(
      (allColumns, column) => {
        const processedValues = columnProcessors[column]
          ? byValue.map((valueToCompare) =>
              this.datasourceProcessor.preprocess(
                columnProcessors[column],
                valueToCompare,
              ),
            )
          : byValue;

        return {
          ...allColumns,
          [column]: processedValues,
        };
      },
      {},
    );

    return data.filter((row) =>
      columns.some((column) => {
        return processedValuesByColumns?.[column].some((byProccessedValue) =>
          String(row[column]).includes(String(byProccessedValue)),
        );
      }),
    );
  }
}
