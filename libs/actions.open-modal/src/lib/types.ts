import { ActionConfig } from '@spryker/actions';
import { TemplateRef, Type } from '@angular/core';

export interface OpenModalAction<TData = unknown> extends ActionConfig {
    id?: string;
    component?: Type<unknown>;
    template?: TemplateRef<unknown>;
    confirm?: boolean | { title?: string; message?: string };
    data?: TData;
}
