import { AjaxActionResponse } from '@spryker/ajax-action';

export interface UrlHtmlRendererResponse extends AjaxActionResponse {
    html: string;
}
