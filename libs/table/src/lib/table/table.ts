/* tslint:disable:no-empty-interface */
import { ElementRef, Injector, Type } from '@angular/core';
import { LayoutFlatConfig } from '@orchestrator/layout';
import { Observable } from 'rxjs';

import { TableActionTriggeredEvent } from '../../lib/table-actions';
import { TableFeatureConfig } from '../table-config/types';
import { TableFeatureComponent } from '../table-feature';

export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  width?: string;
  multiRenderMode?: boolean;
  multiRenderModeLimit?: number;
  emptyValue?: string;
  sortable?: boolean;
  searchable?: boolean;
}

export interface TableColumnTypeDef {
  type?: TableColumnType;
  typeOptions?: TableColumnTypeOptions;
  typeChildren?: TableColumnTypeDef[];
  typeOptionsMappings?: TableColumnTypeOptionsMappings;
}

export interface TableColumnTypeOptions {
  [key: string]: any;
}

interface TableColumnTypeOptionsMappings {
  [optionName: string]: Record<string, any>; // Map of option values to new values
}

export interface TableColumnTypeRegistry {
  // Key is type string - value is type config class
  'layout-flat': LayoutFlatConfig;
}

export type TableColumnType = keyof TableColumnTypeRegistry;

export interface TableHeaderContext {
  config: TableColumn;
  i: number;
}

export interface TableColumnContext {
  value: TableDataValue;
  row: TableDataRow;
  config: TableColumn;
  i: number;
  j: number;
}

export interface TableColumnTplContext extends TableColumnContext {
  $implicit: TableColumnContext['value'];
}

export interface TableColumnComponent<C = any> {
  config?: C;
  context?: TableColumnContext;
}

export type TableColumnComponentDeclaration = {
  [P in keyof TableColumnTypeRegistry]?: Type<
    TableColumnComponent<
      TableColumnTypeRegistry[P] extends object
        ? TableColumnTypeRegistry[P]
        : any
    >
  >;
};

export type TableColumns = TableColumn[];

export type TableDataValue = unknown | unknown[];

export type TableDataRow = Record<TableColumn['id'], TableDataValue>;

export interface TableData<T extends TableDataRow = TableDataRow> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TableConfig {
  dataSource: TableDatasourceConfig;
  columnsUrl?: string;
  columns?: TableColumns;
  // Features may expect it's config under it's namespace
  [featureName: string]: TableFeatureConfig | unknown;
}

export type ColumnsTransformer = (
  cols: TableColumns,
) => Observable<TableColumns>;

export type TableDataConfig = Record<string, unknown>;

export interface SortingCriteria {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export type TableEvents = Record<string, ((data: unknown) => void) | undefined>;

export interface TableComponent {
  config$: Observable<TableConfig>;
  columns$: Observable<TableColumns>;
  data$: Observable<TableData>;
  isLoading$: Observable<boolean>;
  tableId$: Observable<string>;
  features$: Observable<TableFeatureComponent<TableFeatureConfig>[]>;
  tableElementRef: ElementRef<HTMLElement>;
  updateRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
  setRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
}

export enum TableFeatureLocation {
  top = 'top',
  beforeTable = 'before-table',
  header = 'header',
  headerExt = 'header-ext',
  beforeRows = 'before-rows',
  beforeColsHeader = 'before-cols-header',
  beforeCols = 'before-cols',
  cell = 'cell',
  afterCols = 'after-cols',
  afterColsHeader = 'after-cols-header',
  afterRows = 'after-rows',
  afterTable = 'after-table',
  bottom = 'bottom',
  hidden = 'hidden',
}

export interface TableDatasourceRegistry {
  // http
  // inline?
  // etc...
}

export type TableDatasourceType = keyof TableDatasourceRegistry;

export interface TableDatasourceConfig {
  type: TableDatasourceType;
  // Specific datasource types may have custom configs
  [k: string]: unknown;
}

export interface TableDatasource<C extends TableDatasourceConfig> {
  resolve(
    datasource: C,
    dataConfig$: Observable<TableDataConfig>,
    injector: Injector,
  ): Observable<TableData>;
}

export type TableDatasourceTypesDeclaration = {
  [P in keyof TableDatasourceRegistry]?: Type<
    TableDatasource<TableDatasourceRegistry[P]>
  >;
};

export interface TableRowActionRegistry {
  // Key is action string - value is action options type
}

export type TableRowAction = keyof TableRowActionRegistry;

export interface TableRowActionHandler {
  handleAction(actionEvent: TableActionTriggeredEvent): void;
}

export interface TableRowActionsDeclaration {
  [type: string]: TableRowActionHandler;
}

export interface TableRowClickEvent {
  row: TableDataRow;
  event: Event;
}
