import { Type, Injector } from '@angular/core';
import { NotificationType } from '@spryker/notification';

export interface AjaxActionNotification {
  type: NotificationType;
  message: string;
}

// tslint:disable-next-line: no-empty-interface
export interface AjaxPostActionRegistry {}

export type AjaxPostActionType = keyof AjaxPostActionRegistry;

export interface AjaxPostAction {
  type: string;
  // Specific AjaxPostAction types may have custom props
  [k: string]: unknown;
}

export interface AjaxPostActionHandler {
  handleAction(action: AjaxPostAction, injector: Injector): void;
}

export interface AjaxPostActionsDeclaration {
  [type: string]: Type<AjaxPostActionHandler>;
}

export interface AjaxActionResponse {
  notifications?: AjaxActionNotification[];
  postActions?: AjaxPostAction[];
}
