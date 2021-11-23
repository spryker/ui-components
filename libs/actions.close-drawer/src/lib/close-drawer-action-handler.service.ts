import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { DrawerRef } from '@spryker/drawer';
import { UnsavedChangesMonitorToken } from '@spryker/unsaved-changes';
import { Observable, of } from 'rxjs';

import { CloseDrawerActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class CloseDrawerActionHandlerService
  implements ActionHandler<unknown, void>
{
  handleAction(
    injector: Injector,
    config: CloseDrawerActionConfig,
    context: unknown,
  ): Observable<void> {
    injector.get(UnsavedChangesMonitorToken, null)?.reset();
    injector.get(DrawerRef).close();

    return of(void 0);
  }
}
