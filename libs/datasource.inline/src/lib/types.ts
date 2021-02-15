import { DatasourceConfig, Datasource } from '@spryker/datasource';
import { Type } from '@angular/core';

declare module '@spryker/datasource' {
  interface DatasourceRegistry {
    inline: [DatasourceInlineConfig];
  }
}

export interface DatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
  processors: DatasourceInlineConfigPreprocessor;
}

export interface DatasourceInlineContext {
  filter: DatasourceInlineConfigFilter;
  search: DatasourceFilterOptions;
  pagination: any;
  [index: string]: unknown;
}

export interface DatasourceFilterOptions {
  type: string;
  columns: string[];
}

export interface DatasourceInlineConfigFilter {
  [filterId: string]: DatasourceFilterOptions;
}

export type DatasourceFilterValue = unknown[];

export interface DatasourceInlineConfigPreprocessor {
  [columnId: string]: string;
}

export interface DatasourceFilter {
  filter(
    data: unknown[],
    options: DatasourceFilterOptions,
    byValue: DatasourceFilterValue,
    columnProcessors: DatasourceInlineConfigPreprocessor,
  ): unknown[];
}

export interface DatasourceFiltersDeclaration {
  [type: string]: Type<DatasourceFilter>;
}

export interface DatasourceProcessor {
  preprocess(value: unknown): unknown;
  postprocess(value: unknown): unknown;
}

export interface DatasourceProcessorsDeclaration {
  [type: string]: Type<DatasourceProcessor>;
}
