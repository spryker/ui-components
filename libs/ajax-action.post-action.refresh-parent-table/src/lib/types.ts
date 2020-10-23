import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    refresh_parent_table: AjaxPostActionRefreshParentTable;
  }
}

export interface AjaxPostActionRefreshParentTable extends AjaxPostAction {
  type: 'refresh_parent_table';
}
