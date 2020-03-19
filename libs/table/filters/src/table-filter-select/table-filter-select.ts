import { TableFilterBase } from '@spryker/table/features';

export interface TableFilterSelect
  extends TableFilterBase<TableFilterSelectValues> {
  type: 'select';
  typeOptions: TableFilterSelectOptions;
}

export interface TableFilterSelectOptions {
  values: TableFilterSelectOptionsValue[];
}

export interface TableFilterSelectOptionsValue {
  value: TableFilterSelectValue;
  title: string;
}

export type TableFilterSelectValue = unknown;
export type TableFilterSelectValues = readonly TableFilterSelectValue[];
