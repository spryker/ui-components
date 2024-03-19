import { AjaxActionResponse } from '@spryker/ajax-action';

export interface AjaxFormResponse extends AjaxActionResponse {
    form?: string;
    action?: string;
    method?: string;
}
