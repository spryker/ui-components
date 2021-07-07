import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { TableDataConfiguratorService } from '@spryker/table';
import { Observable, of } from 'rxjs';

import { RefreshTableActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class RefreshTableActionHandlerService
  implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: RefreshTableActionConfig,
    context: unknown,
  ): Observable<void> {
    injector.get(TableDataConfiguratorService).update({});

    return of(void 0);
  }
}
