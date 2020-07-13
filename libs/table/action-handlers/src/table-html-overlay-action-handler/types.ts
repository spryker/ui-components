import { TableActionBase, TableActionHandler } from '@spryker/table';
import { AjaxActionResponse } from '@spryker/ajax-action';
import { Observable } from 'rxjs';

declare module '@spryker/table' {
  interface TableActionRegistry {
    'html-overlay': TableHtmlOverlayAction;
  }
}

export interface TableHtmlOverlayResponse extends AjaxActionResponse {
  html?: string;
}

export interface TableHtmlOverlayOptions {
  url: string;
  method?: string;
}

export interface TableHtmlOverlayAction extends TableActionBase {
  typeOptions: TableHtmlOverlayOptions;
}

export type TableHtmlOverlayDrawerRefData = Observable<TableHtmlOverlayOptions>;
