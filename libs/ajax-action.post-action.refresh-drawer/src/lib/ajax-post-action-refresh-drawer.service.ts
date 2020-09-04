import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { DrawerRef } from '@spryker/drawer';

import { AjaxPostActionRefreshDrawer } from './types';

/**
 * Refresh the drawer {@link DrawerRef}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRefreshDrawerService
  implements AjaxPostActionHandler {
  handleAction(action: AjaxPostActionRefreshDrawer, injector: Injector): void {
    injector.get(DrawerRef).refreshDrawer();
  }
}
