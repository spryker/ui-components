import { TableFeatureConfig, TableDataRow } from '@spryker/table';

// tslint:disable-next-line: no-empty-interface
export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
  data: TableDataRow;
  index: number;
}

export type TableSelectionChangeEvent = TableSelectionRow[];
