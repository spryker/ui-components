import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { TableDataConfiguratorService } from '@spryker/table';

import { AjaxPostActionRefreshTable } from './types';

/**
 * Refresh the table via {@link TableDataConfiguratorService}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRefreshTableService
  implements AjaxPostActionHandler {
  handleAction(action: AjaxPostActionRefreshTable, injector: Injector): void {
    injector.get(TableDataConfiguratorService).update({});
  }
}
