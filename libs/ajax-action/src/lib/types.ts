import { Type } from '@angular/core';
import { NotificationDataType } from '@spryker/notification';

export interface AjaxActionNotification {
  type: NotificationDataType;
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
  handleAction(action: AjaxPostAction): void;
}

export interface AjaxPostActionsDeclaration {
  [type: string]: Type<AjaxPostActionHandler>;
}

export interface AjaxActionResponse {
  notifications?: AjaxActionNotification[];
  postAction?: AjaxPostAction;
}
