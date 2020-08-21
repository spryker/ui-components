import { TableActionBase, TableFeatureConfig } from '@spryker/table';
import { TableSelectionRow } from '@spryker/table.feature.selectable';

declare module '@spryker/table' {
  interface TableConfig {
    batchActions?: TableBatchActionsConfig;
  }
}

export interface TableBatchActionsConfig extends TableFeatureConfig {
  actions: TableBatchAction[];
  rowIdPath: string;
  noActionsMessage?: string;
  availableActionsPath?: string;
}

export interface TableBatchAction extends TableActionBase {
  title: string;
}

export interface TableBatchActionContext {
  rowIds: string[];
}

export interface TableItemActions {
  actions: TableBatchAction[];
  rowIdPath: string;
  selectedRows: SelectedRows[];
}
