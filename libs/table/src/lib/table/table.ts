/* tslint:disable:no-empty-interface */
import { Type, EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  sortable?: true;
  width?: string;
}

export interface TableColumnTypeDef {
  type: TableColumnType;
  typeOptions: TableColumnTypeOptions;
  children?: TableColumnTypeDef[];
}

export interface TableColumnTypeOptions {
  [key: string]: any;
}

export interface TableColumnTypeRegistry {
  // link; // Extention on project level
}

export type TableColumnTypes = keyof TableColumnTypeRegistry;

export type TableColumnType = 'layout-flat' | TableColumnTypes;

export interface TableColumnContext {
  value: unknown;
  row: TableDataRow;
  id: TableColumn['id'];
}

export interface TableColumnTplContext extends TableColumnContext {
  $implicit: TableColumnContext['value'];
}

export interface TableColumnComponent<C = any> {
  config?: C;
  context: TableColumnContext;
}

export interface TableColumnComponentDeclaration {
  [name: string]: Type<TableColumnComponent>;
}

export type TableColumns = TableColumn[];

export type TableDataRow = Record<TableColumn['id'], unknown>;

export interface TableData {
  data: TableDataRow[];
  total: number;
  offset: number;
  size: number;
}

export interface TableRowActionBase {
  id: TableRowAction;
  title: string;
}

export interface TableRowActionRegistry {
  // link;
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
  fixHeader?: string;
  rowActions?: TableRowActionBase[];
}

export interface TableComponent {
  tableId: string;
  config: TableConfig;
  selectionChange: EventEmitter<TableDataRow[]>;
  actionTriggered: EventEmitter<TableActionTriggeredEvent>;
  features: TableFeatureComponent[];
  featuresLocation: Record<string, TableFeatureComponent[]>;
  allChecked: boolean;
  isIndeterminate: boolean;
  checkedRows: Record<TableColumn['id'], boolean>;
  getTableId(): string;
  toggleCheckedRows(isChecked: boolean): void;
  updateCheckedRows(): void;
  updateSorting(event: {
    key: string;
    value: 'descend' | 'ascend' | null;
  }): void;
  updatePagination(page: number): void;
}

export type ColumnsTransformer = (
  cols: TableColumns,
) => Observable<TableColumns>;

export interface TableColumnsResolverService {
  resolve(colsOrUrl: string | TableColumns): Observable<TableColumns>;
  addTransformer(transformer: ColumnsTransformer): void;
}

export type TableDataConfig = Record<string, unknown>;

export interface TableDataConfiguratorService {
  readonly config$: Observable<TableDataConfig>;
  changePage(page: number): void;
  update(criteria: TableDataConfig): void;
  reset(): void;
}

export interface TableDataFetcherService {
  resolve(dataUrl: string): Observable<TableData>;
}

export interface SortingCriteria {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface ColTplDirective {
  colTpl: TableColumn['id'];
  templateRef: TemplateRef<TableColumnTplContext>;
}

export interface TableFeatureContext {
  location: string;
}

// It should be abstract class
export interface TableFeatureComponent {
  location: string; // @Input - CSV style format
  styles?: string | Record<string, string>; // @Input
  template?: TemplateRef<TableFeatureContext>; // @ViewChild
  table: TableComponent;
  columnsResolverService: TableColumnsResolverService;
  dataFetcherService: TableDataFetcherService;
  dataConfiguratorService: TableDataConfiguratorService;

  setTableComponent(table: TableComponent): void;
  setColumnsResolverService(service: TableColumnsResolverService): void;
  setDataFetcherService(service: TableDataFetcherService): void;
  setDataConfiguratorService(service: TableDataConfiguratorService): void;
  getTemplate(): TemplateRef<TableFeatureContext>;
}

// With selector `spy-table-feature`
export interface TableFeatureDirective {
  component: TableFeatureComponent; // Injected from constructor
}

export interface HttpOptionsParams {
  [param: string]: string | ReadonlyArray<string>;
}
