import { Type } from '@angular/core';
import { TableDataRow, TableDatasourceConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableDatasourceTypeRegistry {
    inline: TableDatasourceInlineConfig;
  }
}

export interface TableFiltrationOptions {
  type: string;
  columns: string[];
  preprocess?: string;
}

export type TableFiltrationByValue = any;

export interface TableDatasourceInlineConfig extends TableDatasourceConfig {
  data: TableDataRow[];
  filter: {
    [key: string]: TableFiltrationOptions;
  };
  search: TableFiltrationOptions;
}

export interface TableFiltration {
  filtration(
    data: TableDataRow[],
    filtrationOptions: TableFiltrationOptions,
    filtrationByValue: TableFiltrationByValue,
  ): TableDataRow[];
}

export interface TableFiltrationTypesDeclaration {
  [type: string]: Type<TableFiltration>;
}
