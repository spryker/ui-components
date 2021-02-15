import { Injectable } from '@angular/core';
import { DatasourceProcessorService } from '../datasource-processor.service';

import {
  DatasourceFilter,
  DatasourceFilterValue,
  DatasourceFilterOptions,
  DatasourceInlineConfigPreprocessor,
} from '../types';

/**
 * Filters data by value that matches with the column value.
 */
@Injectable({ providedIn: 'root' })
export class DatasourceTextFilter implements DatasourceFilter {
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
