import { TableActionBase, TableDataRow } from '@spryker/table';

export interface TableRowActionBase extends TableActionBase {
  title: string;
  icon?: string;
}

export interface TableRowActionContext {
  row: TableDataRow;
  /** Picked by TableRowActionsConfig['rowIdPath'] */
  rowId?: string;
}
