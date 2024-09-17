import { TemplateRef } from '@angular/core';

export type SelectValue = string | number;
export type SelectValueSelected = SelectValue | SelectValue[];
export type SelectOption = SelectValue | SelectOptionItem;

export interface SelectOptionItem {
    title: string;
    value: SelectValue;
    isDisabled?: boolean;
    template?: TemplateRef<void>;
}
