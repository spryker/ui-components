import { TableFilterBase } from '@spryker/table.feature.filters';

declare module '@spryker/table.feature.filters' {
  interface TableFiltersRegistry {
    'tree-select': TableFilterTreeSelect;
  }
}

/**
 * Interface {@link TableFilterTreeSelect} represents config of the Tree Select filters feature
 */
export interface TableFilterTreeSelect
  extends TableFilterBase<TableFilterTreeSelectValue> {
  type: 'tree-select';
  typeOptions: TableFilterTreeSelectOptions;
}

/**
 * Interface represents typeOptions of {@link TableFilterTreeSelectComponent}
 */
export interface TableFilterTreeSelectOptions {
  values: TableFilterTreeSelectOptionsValue[];
  multiselect?: boolean;
}

/**
 * Represents how values array should look like for the usage with {@link TreeSelectComponent}
 */
export interface TableFilterTreeSelectOptionsValue {
  value: TableFilterTreeSelectValue;
  title: string;
  children?: TableFilterTreeSelectOptionsValue[];
}

export type TableFilterTreeSelectValue = unknown | unknown[];
