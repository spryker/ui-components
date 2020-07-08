import { TableActionBase, TableDataRow } from '@spryker/table';

export interface TableRowActionBase extends TableActionBase {
  title: string;
  icon?: string;
}

export interface TableRowActionContext {
  row: TableDataRow;
  rowId?: string /** Picked by TableRowActionsConfig['rowIdPath'] */;
}
