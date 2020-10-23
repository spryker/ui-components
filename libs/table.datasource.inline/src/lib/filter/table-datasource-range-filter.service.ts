import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';
import { TableDatasourceProcessorService } from '../table-datasource-processor.service';

import {
  TableDatasourceFilter,
  TableDatasourceFilterValue,
  TableDatasourceFilterOptions,
  TableDatasourceInlineConfigPreprocessor,
} from '../types';

export interface TableDatasourceRangeFilterValue {
  from?: any;
  to?: any;
}

/**
 * Filters data by value that is in range with the column value.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceRangeFilter implements TableDatasourceFilter {
  constructor(private datasourceProcessor: TableDatasourceProcessorService) {}

  filter(
    data: TableDataRow[],
    options: TableDatasourceFilterOptions,
    byValue: TableDatasourceFilterValue,
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
  ): TableDataRow[] {
    if (!this.isFilterValue(byValue)) {
      return data;
    }

    const columns = Array.isArray(options.columns)
      ? options.columns
      : [options.columns];
    const columnFrom = columns[0];
    const columnTo = columns.length !== 1 ? columns[1] : columns[0];
    const processedValuesByColumns: Record<
      string,
      TableDatasourceRangeFilterValue[]
    > = columns.reduce((allColumns, column) => {
      const processedValues = columnProcessors[column]
        ? byValue.map(valueToCompare => ({
            from: this.datasourceProcessor.preprocess(
              columnProcessors[column],
              valueToCompare.from,
            ),
            to: this.datasourceProcessor.preprocess(
              columnProcessors[column],
              valueToCompare.to,
            ),
          }))
        : byValue;

      return {
        ...allColumns,
        [column]: processedValues,
      };
    }, {});
    const isValueFrom = processedValuesByColumns?.[columnFrom].some(
      byProccessedValue => byProccessedValue.from,
    );
    const isValueTo = processedValuesByColumns?.[columnTo].some(
      byProccessedValue => byProccessedValue.to,
    );

    if (isValueFrom && isValueTo) {
      return data.filter(row => {
        const columnsFromData = row[columnFrom] as any;
        const columnsToData = row[columnTo] as any;

        return (
          processedValuesByColumns?.[columnFrom].some(
            byProccessedValue => columnsFromData >= byProccessedValue.from,
          ) &&
          processedValuesByColumns?.[columnTo].some(
            byProccessedValue => columnsToData <= byProccessedValue.to,
          )
        );
      });
    }

    if (isValueFrom) {
      return data.filter(row => {
        const columnsData = row[columnFrom] as any;

        return processedValuesByColumns?.[columnFrom].some(
          byProccessedValue => columnsData >= byProccessedValue.from,
        );
      });
    }

    if (isValueTo) {
      return data.filter(row => {
        const columnsData = row[columnTo] as any;

        return processedValuesByColumns?.[columnTo].some(
          byProccessedValue => columnsData <= byProccessedValue.to,
        );
      });
    }

    return data;
  }

  private isFilterValue(args: any): args is TableDatasourceRangeFilterValue[] {
    return args.every((arg: any) => arg && ('from' in arg || 'to' in arg));
  }
}
