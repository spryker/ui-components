import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    redirect: AjaxPostActionRedirect;
  }
}

export interface AjaxPostActionRedirect extends AjaxPostAction {
  type: 'redirect';
  url: string;
}
