import { Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { DrawerRef } from '@spryker/drawer';

import { AjaxPostActionClose } from './types';

/**
 * Closes drawer
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionCloseService implements AjaxPostActionHandler {
  handleAction(action: AjaxPostActionClose, injector: Injector): void {
    injector.get(DrawerRef).close();
  }
}
