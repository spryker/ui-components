import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { AjaxFormComponent } from '@spryker/ajax-form';

import { AjaxPostActionRefreshAjaxForm } from './types';

/**
 * Refresh the table via {@link TableDataConfiguratorService}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRefreshAjaxFormService
  implements AjaxPostActionHandler {
  handleAction(
    action: AjaxPostActionRefreshAjaxForm,
    injector: Injector,
  ): void {
    injector.get(AjaxFormComponent).refreshForm();
  }
}
