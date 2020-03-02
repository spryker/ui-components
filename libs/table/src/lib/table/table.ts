import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export type TableDataConfig = Record<string, unknown>;

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

export interface TableDataConfiguratorVisitor {
  applyTableDataConfigurator(service: TableDataConfiguratorService): void;
}

export interface TableData {
  data: TableDataRow[];
  total: number;
  offset: number;
  size: number;
}

export type TableDataRow = Record<TableColumn['id'], unknown>;

export interface TableComponent extends TableDataConfiguratorVisitor {
  tableId: string; // From BE or generated
  config: TableConfig;
  selectionChange: EventEmitter<TableData>;
  checkedRows: Record<TableColumn['id'], boolean>;
  allChecked: boolean;
  isIndeterminate: boolean;
  getTableId(): string;
  toggleCheckedRows(isChecked: boolean): void;
  updateCheckedRows(): void;
  updateSorting(event: {
    nzSortKey: string;
    value: 'descend' | 'ascend' | null;
  }): void;
  updatePagination(page: number): void;
}

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
}

export interface TableDataFetcherService {
  resolve(dataUrl: string): Observable<TableData>;
}
