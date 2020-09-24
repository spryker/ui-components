import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { DrawerRef } from '@spryker/drawer';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';

import { AjaxPostActionClose } from './types';

/**
 * Closes the drawer via {@link DrawerRef}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionCloseService implements AjaxPostActionHandler {
  handleAction(action: AjaxPostActionClose, injector: Injector): void {
    injector.get(UnsavedChangesFormMonitorDirective, null)?.reset();
    injector.get(DrawerRef).close();
  }
}
