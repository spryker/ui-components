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
  from: number | Date;
  to: number | Date;
}

@Injectable({ providedIn: 'root' })
export class TableDatasourceRangeFilter implements TableDatasourceFilter {
  constructor(private datasourceProcessor: TableDatasourceProcessorService) {}

  filter(
    data: TableDataRow[],
    options: TableDatasourceFilterOptions,
    byValue: TableDatasourceFilterValue,
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
  ): TableDataRow[] {
    if (this.isFilterValue(byValue)) {
      const columnsArray = Array.isArray(options.columns)
        ? options.columns
        : [options.columns];
      const columnFrom = columnsArray[0];
      const columnTo =
        columnsArray.length !== 1 ? columnsArray[1] : columnsArray[0];
      let byValueFrom = byValue.from;
      let byValueTo = byValue.to;
      let isValuePreprocessed = false;

      if (byValue.from && byValueTo) {
        return data.filter(row => {
          const columnsFromData = row[columnFrom] as Date | string;
          const columnsToData = row[columnTo] as Date | string;

          if (!isValuePreprocessed) {
            if (columnProcessors?.[columnFrom]) {
              byValueFrom = this.datasourceProcessor.preprocess(
                columnProcessors[columnFrom],
                byValueFrom,
              ) as number | Date;
            }

            if (columnProcessors?.[columnTo]) {
              byValueTo = this.datasourceProcessor.preprocess(
                columnProcessors[columnTo],
                byValueTo,
              ) as number | Date;
            }

            isValuePreprocessed = true;
          }

          return columnsFromData >= byValueFrom && columnsToData <= byValueTo;
        });
      }

      if (byValueFrom) {
        return data.filter(row => {
          const columnsData = row[columnFrom] as Date | number;

          if (!isValuePreprocessed && columnProcessors?.[columnFrom]) {
            byValueFrom = this.datasourceProcessor.preprocess(
              columnProcessors[columnFrom],
              byValueFrom,
            ) as number | Date;

            isValuePreprocessed = true;
          }

          return columnsData >= byValueFrom;
        });
      }

      if (byValueTo) {
        return data.filter(row => {
          const columnsData = row[columnTo] as Date | number;

          if (!isValuePreprocessed && columnProcessors?.[columnTo]) {
            byValueTo = this.datasourceProcessor.preprocess(
              columnProcessors[columnTo],
              byValueTo,
            ) as number | Date;

            isValuePreprocessed = true;
          }

          return columnsData <= byValueTo;
        });
      }
    }

    return data;
  }

  private isFilterValue(arg: any): arg is TableDatasourceRangeFilterValue {
    return arg && ('from' in arg || 'to' in arg);
  }
}
