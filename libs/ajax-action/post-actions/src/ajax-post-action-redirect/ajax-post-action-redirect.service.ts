import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AjaxPostAction, AjaxPostActionHandler } from '@spryker/ajax-action';
import { WindowToken } from './tokens';
import { InjectionTokenType } from '@spryker/utils';
// Add redirect type to registry
declare module '@spryker/ajax-action' {
  interface AjaxPostActionRegistry {
    redirect: AjaxPostActionRedirect;
  }
}

export interface AjaxPostActionRedirect extends AjaxPostAction {
  type: 'redirect';
  url: string;
}

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
