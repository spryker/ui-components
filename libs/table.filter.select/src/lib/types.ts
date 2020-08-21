import { TableFilterBase } from '@spryker/table.feature.filters';

export interface TableFilterSelect
  extends TableFilterBase<TableFilterSelectValue> {
  type: 'select';
  typeOptions: TableFilterSelectOptions;
}

export interface TableFilterSelectOptions {
  values: TableFilterSelectOptionsValue[];
  multiselect?: boolean;
}

export interface TableFilterSelectOptionsValue {
  value: TableFilterSelectValue;
  title: string;
}

export type TableFilterSelectValue = unknown | unknown[];
