import {
  TableActionBase,
  TableDataRow,
  TableFeatureConfig,
} from '@spryker/table';

export interface TableRowActionsConfig extends TableFeatureConfig {
  actions?: TableRowActionBase[];
  click?: string;
  rowIdPath?: string;
  availableActionsPath?: string;
}

export interface TableRowActionBase extends TableActionBase {
  title: string;
  icon?: string;
}

export interface TableRowActionContext {
  row: TableDataRow;
  /** Picked by TableRowActionsConfig['rowIdPath'] */
  rowId?: string;
}
