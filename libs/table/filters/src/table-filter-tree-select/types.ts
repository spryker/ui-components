import { TableFilterBase } from '@spryker/table/features';

export interface TableFilterTreeSelect
  extends TableFilterBase<TableFilterTreeSelectValue> {
  type: 'tree-select';
  typeOptions: TableFilterTreeSelectOptions;
}

export interface TableFilterTreeSelectOptions {
  values: TableFilterTreeSelectOptionsValue[];
  multiselect?: boolean;
}

export interface TableFilterTreeSelectOptionsValue {
  value: TableFilterTreeSelectValue;
  title: string;
  children?: TableFilterTreeSelectOptionsValue[];
}

export type TableFilterTreeSelectValue = unknown | unknown[];
