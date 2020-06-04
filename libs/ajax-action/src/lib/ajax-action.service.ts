import { Inject, Injectable, Optional, Injector } from '@angular/core';
import {
  AjaxActionResponse,
  AjaxPostActionsDeclaration,
  AjaxPostActionHandler,
} from './types';
import { InjectionTokenType } from '@spryker/utils';
import { NotificationService, NotificationData } from '@spryker/notification';
import { AjaxPostActionsToken } from './tokens';

/**
 * Combines all ajax action by token and invoke appropriate via handle method
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxActionService {
  private actionHandlersObject: AjaxPostActionsDeclaration =
    this.actionHandlers?.reduce(
      (actions, action) => ({ ...actions, ...action }),
      {},
    ) || {};

  constructor(
    private injector: Injector,
    private notificationService: NotificationService,
    @Optional()
    @Inject(AjaxPostActionsToken)
    private actionHandlers?: InjectionTokenType<typeof AjaxPostActionsToken>,
  ) {}

  handle(response: AjaxActionResponse): void {
    if (!response.postAction?.type) {
      return;
    }

    const actionClass = this.actionHandlersObject[response.postAction.type];

    if (!actionClass) {
      throw new Error(`AjaxPostActionHandler: action type is not defined!`);
    }

    const actionService: AjaxPostActionHandler = this.injector.get(actionClass);

    actionService.handleAction(response.postAction);

    if (response.notifications?.length) {
      response.notifications.forEach(notification => {
        const { type, message } = notification;

        this.notificationService.show({
          type: type as NotificationData['type'],
          title: message,
        });
      });
    }
  }
}
