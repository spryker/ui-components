import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';

import {
  TableFiltration,
  TableFiltrationByValue,
  TableFiltrationOptions,
} from '../types';

@Injectable({ providedIn: 'root' })
export class TableFiltrationRangeService implements TableFiltration {
  filtration(
    data: TableDataRow[],
    filtrationOptions: TableFiltrationOptions,
    filterByValue: TableFiltrationByValue,
  ): TableDataRow[] {
    const columnsArray = Array.isArray(filtrationOptions.columns)
      ? filtrationOptions.columns
      : [filtrationOptions.columns];
    const columnFrom = columnsArray[0];
    const columnTo =
      columnsArray.length !== 1 ? columnsArray[1] : columnsArray[0];
    const withPreprocess = filtrationOptions?.preprocess === 'date';
    const fromValue = withPreprocess
      ? filterByValue.from?.getTime()
      : filterByValue.from;
    const toValue = withPreprocess
      ? filterByValue.to?.getTime()
      : filterByValue.to;

    if (filterByValue.from && filterByValue.to) {
      return data.filter(row => {
        const columnsFromData = row[columnFrom] as Date | string;
        const columnsToData = row[columnTo] as Date | string;
        const comparedFromValue = withPreprocess
          ? new Date(columnsFromData).getTime()
          : columnsFromData;
        const comparedToValue = withPreprocess
          ? new Date(columnsToData).getTime()
          : columnsToData;

        return comparedFromValue >= fromValue && comparedToValue <= toValue;
      });
    }

    if (filterByValue.from) {
      return data.filter(row => {
        const columnsData = row[columnFrom] as Date | string;
        const comparedValue = withPreprocess
          ? new Date(columnsData).getTime()
          : columnsData;

        return comparedValue >= fromValue;
      });
    }

    if (filterByValue.to) {
      return data.filter(row => {
        const columnsData = row[columnTo] as Date | string;
        const comparedValue = withPreprocess
          ? new Date(columnsData).getTime()
          : columnsData;

        return comparedValue <= toValue;
      });
    }

    return data;
  }
}
