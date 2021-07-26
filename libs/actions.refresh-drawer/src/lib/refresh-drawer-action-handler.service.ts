import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { DrawerRef } from '@spryker/drawer';
import { Observable, of } from 'rxjs';
import { RefreshDrawerActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class RefreshDrawerActionHandlerService
  implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: RefreshDrawerActionConfig,
    context: unknown,
  ): Observable<void> {
    injector.get(DrawerRef).refreshDrawer();

    return of(void 0);
  }
}
