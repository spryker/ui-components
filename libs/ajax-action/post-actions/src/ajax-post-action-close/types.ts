import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    close: AjaxPostActionClose;
  }
}

export interface AjaxPostActionClose extends AjaxPostAction {
  type: 'close';
}
