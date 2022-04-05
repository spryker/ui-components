import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import {
  TableDataConfiguratorService,
  TableLocatorService,
} from '@spryker/table';
import { Observable, of } from 'rxjs';

import { RefreshTableActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class RefreshTableActionHandlerService
  implements ActionHandler<unknown, void>
{
  handleAction(
    injector: Injector,
    config: RefreshTableActionConfig,
    context: unknown,
  ): Observable<void> {
    let dataConfiguratorService: TableDataConfiguratorService | undefined;

    if (config.tableId) {
      const table = injector.get(TableLocatorService).findById(config.tableId);

      dataConfiguratorService = table?.injector.get(
        TableDataConfiguratorService,
      );
    } else {
      dataConfiguratorService = injector.get(TableDataConfiguratorService);
    }

    if (!dataConfiguratorService) {
      throw new Error(
        `RefreshTableActionHandlerService: Could not refresh table ${config.tableId}!`,
      );
    }

    dataConfiguratorService.update({});

    return of(void 0);
  }
}
