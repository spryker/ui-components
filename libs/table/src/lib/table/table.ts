/* tslint:disable:no-empty-interface */
import { Type } from '@angular/core';
import { LayoutFlatConfig } from '@orchestrator/layout';
import { Observable } from 'rxjs';

export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  sortable?: true;
  width?: string;
  multiRenderMode?: boolean;
  multiRenderModeLimit?: number;
  hideable?: boolean;
  searchable?: boolean;
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
  id: TableColumn['id'];
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

export interface TableRowActionBase {
  id: TableRowAction;
  title: string;
}

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

export interface TableActionTriggeredEvent {
  action: TableRowActionBase;
  items: TableDataRow[];
}

export interface TableConfig {
  columnsUrl?: string;
  dataUrl: string;
  columns?: TableColumns;
  selectable?: boolean;
  pageSizes?: number[];
  rowActions?: TableRowActionBase[];
}

export type ColumnsTransformer = (
  cols: TableColumns,
) => Observable<TableColumns>;

export type TableDataConfig = Record<string, unknown>;

export interface SortingCriteria {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TableFeatureContext {
  location: string;
}

// @Injectable() class
interface TableColumnListConfig implements TableColumnListConfigInner {
  // @ColumnTypeOption()
  limit: 2;
}

export interface TableColumnListConfigInner implements TableColumnTypeDef {
  // @ColumnTypeOption()
  type?: string;
  // @ColumnTypeOption()
  typeOptions?: Object;
  // @ColumnTypeOption()
  typeChildren?: TableColumnListConfigInner[];
}
