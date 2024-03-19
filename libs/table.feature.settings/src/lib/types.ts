import { TableFeatureConfig, TableColumn } from '@spryker/table';

export interface TableSettingsConfig extends TableFeatureConfig {
    tableId?: string;
}

export interface TableSettingsColumn extends TableColumn {
    hidden?: boolean;
    hideable?: boolean;
}

export interface TableSettingsChangeEvent {
    tableColumns: TableSettingsColumn[];
    popoverColumns: TableSettingsColumn[];
    visibilityChanged?: string;
}

export type TableSettingsColumns = TableSettingsColumn[];
