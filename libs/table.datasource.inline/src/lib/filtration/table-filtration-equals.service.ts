import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';

import {
  TableFiltration,
  TableFiltrationByValue,
  TableFiltrationOptions,
} from '../types';

@Injectable({ providedIn: 'root' })
export class TableFiltrationEqualsService implements TableFiltration {
  filtration(
    data: TableDataRow[],
    filtrationOptions: TableFiltrationOptions,
    filterByValue: TableFiltrationByValue,
  ): TableDataRow[] {
    const columns = Array.isArray(filtrationOptions.columns)
      ? filtrationOptions.columns
      : [filtrationOptions.columns];

    return data.filter(row => {
      const filteredRows = columns.filter(column => {
        const isValueArray = Array.isArray(filterByValue);
        if (isValueArray && !filterByValue.length) {
          return true;
        }

        if (isValueArray) {
          return filterByValue.includes(row[column]);
        } else {
          return row[column] === filterByValue;
        }
      });

      return filteredRows.length;
    });
  }
}
