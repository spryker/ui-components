import { Type, EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type TableDataConfig = Record<string, unknown>;

export interface TableRowActionBase {
  id: TableRowAction;
  title: string;
}

export interface TableRowActionRegistry {
  id: 'id'
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

export interface TableDataConfiguratorService {
  // {sort: ..., filter: ..., page: page}
  changePage(page: number): void;

  // {sort: {key: '', order: 'asc'}}
  // {filter: {id: '', options: ['', ...]}}
  update(criteria: TableDataConfig): void;

  // {sort: ..., filter: ..., page: 0}
  reset(): void;

  // {page: 0}
  readonly config$: Observable<TableDataConfig>;
}

export interface TableData {
  data: TableDataRow[];
  total: number;
  offset: number;
  size: number;
}

export type TableDataRow = Record<TableColumn['id'], unknown>;

export interface TableColumnTypeRegistry {
  // link; // Extention on project level
}

export type TableColumnTypes = keyof TableColumnTypeRegistry;

export type TableColumnType = 'layout-flat' | TableColumnTypes;

export interface TableColumnTypeDef {
  type: TableColumnType;
  typeOptions: TableColumnTypeOptions;
  children?: TableColumnTypeDef;
}

export interface TableColumnTypeOptions {
  [key: string]: any; // Options index signature
}

export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  sortable?: true;
  width?: string;
}

export type TableColumns = TableColumn[];

export interface TableConfig {
  colsUrl?: string; // => TableColumns
  dataUrl: string; // => TableData
  cols?: TableColumns;
  selectable?: boolean;
  rowActions?: TableRowActionBase[];
  actionTriggered: EventEmitter<TableActionTriggeredEvent>;
}

export interface TableDataFetcherService {
  resolve(dataUrl: string): Observable<TableData>;
}

export interface TableColumnComponentDeclaration {
  [name: string]: Type<TableColumnComponent>;
}

export interface TableColumnComponent<C = any> {
  config?: C;
  context: TableColumnContext;
}

export interface TableColumnContext {
  value: unknown; // TableData['data'][][TableColumn['id']]
  row: TableDataRow; // TableData['data'][]
  id: TableColumn['id'];
}
