import { Injectable } from '@angular/core';
import { TableDataRow } from '@spryker/table';

import {
  TableFiltration,
  TableFiltrationByValue,
  TableFiltrationOptions,
} from '../types';

@Injectable({ providedIn: 'root' })
export class TableFiltrationTextService implements TableFiltration {
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
        return (row[column] as any).toString().includes(filterByValue);
      });

      return filteredRows.length;
    });
  }
}
