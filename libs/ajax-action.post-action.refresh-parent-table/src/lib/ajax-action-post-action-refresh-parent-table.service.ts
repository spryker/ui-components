import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import {
  CoreTableComponent,
  TableDataConfiguratorService,
} from '@spryker/table';

import { AjaxPostActionRefreshParentTable } from './types';

/**
 * Refresh the parent table via {@link TableDataConfiguratorService}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRefreshParentTableService
  implements AjaxPostActionHandler {
  handleAction(
    action: AjaxPostActionRefreshParentTable,
    injector: Injector,
  ): void {
    const table = injector.get(CoreTableComponent).parentTable;

    table?.injector.get(TableDataConfiguratorService).update({});
  }
}
