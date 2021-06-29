import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActionHandler } from '@spryker/actions';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';
import { DrawerRef } from '@spryker/drawer';
import { CloseDrawerActionConfig } from './types';

@Injectable({
  providedIn: 'root'
})
export class CloseDrawerActionHandlerService implements ActionHandler<unknown, void> {
  handleAction(injector: Injector, config: CloseDrawerActionConfig, context: unknown): Observable<void> {
    injector.get(UnsavedChangesFormMonitorDirective, null)?.reset();
    injector.get(DrawerRef).close();

    return of(void 0);
  }
}
