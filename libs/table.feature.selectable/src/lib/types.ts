import { TableFeatureConfig, TableDataRow } from '@spryker/table';

export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
  data: TableDataRow;
  index: number;
}

export type TableSelectionChangeEvent = TableSelectionRow[];
