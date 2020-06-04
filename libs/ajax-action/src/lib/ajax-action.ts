import { Type } from '@angular/core';

interface AjaxActionNotification {
  type: string;
  message: string;
}

interface AjaxPostActionRegistry {}

type AjaxPostActionType = keyof AjaxPostActionRegistry;

interface AjaxPostAction {
  type: AjaxPostActionType; //'close_overlay' | 'redirect' | 'refresh_overlay'

  // Specific AjaxPostAction types may have custom props
  [k: string]: unknown;
}

interface AjaxPostActionHandler {
  handleAction(action: AjaxPostAction): void;
}

interface AjaxPostActionsDeclaration {
  [type: string]: Type<AjaxPostActionHandler>;
}

type AjaxPostActionsToken = InjectionToken<AjaxPostActionsDeclaration[]>;

interface AjaxActionResponse {
  notifications?: AjaxActionNotification[];
  postAction?: AjaxPostAction;
}

interface AjaxActionService {
  handle(response: AjaxActionResponse): void;
}
