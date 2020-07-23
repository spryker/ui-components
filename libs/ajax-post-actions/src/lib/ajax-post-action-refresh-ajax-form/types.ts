import { AjaxPostAction } from '@spryker/ajax-action';

declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    refresh_ajax_form: AjaxPostActionRefreshAjaxForm;
  }
}

export interface AjaxPostActionRefreshAjaxForm extends AjaxPostAction {
  type: 'refresh_ajax_form';
}
