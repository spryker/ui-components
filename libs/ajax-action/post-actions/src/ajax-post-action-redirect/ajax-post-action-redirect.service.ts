import { Inject, Injectable } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { WindowToken } from './tokens';
import { AjaxPostActionRedirect } from './types';

/**
 * Changes window location
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxPostActionRedirectService {
  constructor(
    @Inject(WindowToken)
    private windowToken: InjectionTokenType<typeof WindowToken>,
  ) {}

  handleAction(action: AjaxPostActionRedirect): void {
    this.windowToken.location.href = action.url;
  }
}
