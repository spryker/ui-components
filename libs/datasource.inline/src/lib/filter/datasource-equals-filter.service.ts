import { Injectable } from '@angular/core';

import { DatasourceProcessorService } from '../datasource-processor.service';
import {
  DatasourceFilter,
  DatasourceFilterOptions,
  DatasourceFilterValue,
  DatasourceInlineConfigPreprocessor,
} from '../types';

/**
 * Filters data by value that strictly equals to the column value.
 */
@Injectable({ providedIn: 'root' })
export class DatasourceEqualsFilter implements DatasourceFilter {
  constructor(private datasourceProcessor: DatasourceProcessorService) {}

  filter(
    data: unknown[],
    options: DatasourceFilterOptions,
    byValue: DatasourceFilterValue,
    columnProcessors: DatasourceInlineConfigPreprocessor,
  ): unknown[] {
    const columns = Array.isArray(options.columns)
      ? options.columns
      : [options.columns];
    const processedColumns: Record<string, unknown[]> = columns.reduce(
      (allColumns, column) => {
        const processedValue = columnProcessors[column]
          ? byValue.map((valueToCompare) =>
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

    return data.filter((row) =>
      columns.some((column) => {
        if (!byValue.length) {
          return true;
        }

        return processedColumns?.[column].includes(row[column]);
      }),
    );
  }
}
