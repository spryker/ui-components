import { Type } from '@angular/core';
import { LayoutFlatConfig } from '@orchestrator/layout';
import { Observable } from 'rxjs';
import { TableRowActionBase } from '../../../features/src/table-row-actions-feature/types';

export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  sortable?: true;
  width?: string;
  multiRenderMode?: boolean;
  multiRenderModeLimit?: number;
  hideable?: boolean;
  searchable?: boolean;
  emptyValue?: string;
}

export interface TableColumnTypeDef {
  type: TableColumnType;
  typeOptions?: TableColumnTypeOptions;
  children?: TableColumnTypeDef[];
}

export interface TableColumnTypeOptions {
  [key: string]: any;
}

export interface TableColumnTypeRegistry {
  // Key is type string - value is type config class
  'layout-flat': LayoutFlatConfig;
}

export type TableColumnType = keyof TableColumnTypeRegistry;

export interface TableColumnContext {
  value: TableDataValue;
  row: TableDataRow;
  config: TableColumn;
  i: number;
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

export interface TableRowActionHandler {
  handleAction(actionEvent: TableActionTriggeredEvent): void;
}

export interface TableRowActionsDeclaration {
  [type: string]: TableRowActionHandler;
}

export interface TableActionTriggeredEvent {
  action: TableRowActionBase;
  items: TableDataRow[];
}

export interface TableConfig {
  columnsUrl?: string;
  dataUrl: string;
  columns?: TableColumns;
  rowActions?: TableRowActionBase[];
  // Features may expect it's config under it's namespace
  [featureName: string]: unknown; // FIXME: Replace `unknown` to `TableFeatureConfig`
}

export type ColumnsTransformer = (
  cols: TableColumns,
) => Observable<TableColumns>;

export type TableDataConfig = Record<string, unknown>;

export interface SortingCriteria {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TableComponent {
  config$: Observable<TableConfig>;
  columns$: Observable<TableColumns>;
  data$: Observable<TableData>;
  isLoading$: Observable<boolean>;
  getTableId(): string | undefined;
  updateRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
  setRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
}

export enum TableFeatureLocation {
  top = 'top',
  beforeTable = 'before-table',
  headerExt = 'header-ext',
  beforeColsHeader = 'before-cols-header',
  beforeCols = 'before-cols',
  afterColsHeader = 'after-cols-header',
  afterCols = 'after-cols',
  afterTable = 'after-table',
  bottom = 'bottom',
  hidden = 'hidden',
  pagination = 'pagination',
}
