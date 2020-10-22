import { Type } from '@angular/core';
import { TableDataRow, TableDatasourceConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableDatasourceTypeRegistry {
    inline: TableDatasourceInlineConfig;
  }
}

export interface TableDatasourceFilterOptions {
  type: string;
  columns: string[];
}

export interface TableDatasourceInlineConfigFilter {
  [filterId: string]: TableDatasourceFilterOptions;
}

export type TableDatasourceFilterValue = unknown[];

export interface TableDatasourceInlineConfigPreprocessor {
  [columnId: string]: string;
}

export interface TableDatasourceInlineConfig extends TableDatasourceConfig {
  data: TableDataRow[];
  filter: TableDatasourceInlineConfigFilter;
  search: TableDatasourceFilterOptions;
  columnProcessors: TableDatasourceInlineConfigPreprocessor;
}

export interface TableDatasourceFilter {
  filter(
    data: TableDataRow[],
    options: TableDatasourceFilterOptions,
    byValue: TableDatasourceFilterValue,
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
  ): TableDataRow[];
}

export interface TableDatasourceFiltersDeclaration {
  [type: string]: Type<TableDatasourceFilter>;
}

export interface TableDatasourceProcessor {
  preprocess(value: unknown): unknown;
  postprocess(value: unknown): unknown;
}

export interface TableDatasourceProcessorsDeclaration {
  [type: string]: Type<TableDatasourceProcessor>;
}
