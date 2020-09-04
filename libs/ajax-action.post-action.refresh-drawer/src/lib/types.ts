import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    refresh_drawer: AjaxPostActionRefreshDrawer;
  }
}

export interface AjaxPostActionRefreshDrawer extends AjaxPostAction {
  type: 'refresh_drawer';
}
