import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    close_overlay: AjaxPostActionClose;
  }
}

export interface AjaxPostActionClose extends AjaxPostAction {
  type: 'close_overlay';
}
