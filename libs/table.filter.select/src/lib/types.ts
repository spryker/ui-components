// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableFilterBase } from '@spryker/table.feature.filters';
import { SelectValueSelected } from '@spryker/select';

export interface TableFilterSelect extends TableFilterBase<TableFilterSelectValue> {
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

export type TableFilterSelectValue = SelectValueSelected;
