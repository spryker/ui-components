import { Inject, Injectable, Injector } from '@angular/core';
import { AjaxPostActionHandler } from '@spryker/ajax-action';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';
import { InjectionTokenType, WindowToken } from '@spryker/utils';

import { AjaxPostActionRedirect } from './types';

/**
 * Changes window location
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRedirectService implements AjaxPostActionHandler {
  constructor(
    @Inject(WindowToken)
    private windowToken: InjectionTokenType<typeof WindowToken>,
  ) {}

  handleAction(action: AjaxPostActionRedirect, injector: Injector): void {
    injector.get(UnsavedChangesFormMonitorDirective, null)?.reset();
    this.windowToken.location.href = action.url;
  }
}
