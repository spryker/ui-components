import { TableActionBase, TableFeatureConfig } from '@spryker/table';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TableSelectionRow } from '@spryker/table.feature.selectable';

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

export interface SelectedRows extends Record<string, unknown>, TableSelectionRow {}

export interface TableItemActions {
    actions: TableBatchAction[];
    rowIdPath: string;
    selectedRows: SelectedRows[];
}
