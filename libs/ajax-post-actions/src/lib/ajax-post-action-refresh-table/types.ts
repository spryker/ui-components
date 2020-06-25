import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    refresh_table: AjaxPostActionRefreshTable;
  }
}

export interface AjaxPostActionRefreshTable extends AjaxPostAction {
  type: 'refresh_table';
}
