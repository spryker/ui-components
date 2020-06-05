import { Inject, Injector, Optional } from '@angular/core';
import { NotificationService } from '@spryker/notification';
import { InjectionTokenType } from '@spryker/utils';

import { AjaxPostActionsToken } from './tokens';
import {
  AjaxActionResponse,
  AjaxPostActionHandler,
  AjaxPostActionsDeclaration,
} from './types';

/**
 * Combines all ajax action by token and invoke appropriate handle method
 * Shows notifications via {@link NotificationService}
 */
export class AjaxActionService {
  /**
   * Merge tokens array {@link AjaxPostActionsToken} objects into one object by overriding keys
   */
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

  /**
   * Shows notification.
   * Invokes related {@link AjaxPostActionHandler} provided from {@link AjaxPostActionsToken}
   */
  handle(response: AjaxActionResponse, injector?: Injector): void {
    response.notifications?.forEach(notification => {
      const { type, message } = notification;

      this.notificationService.show({
        type,
        title: message,
      });
    });

    if (!response.postAction?.type) {
      return;
    }

    const actionClass = this.actionHandlersObject[response.postAction.type];

    if (!actionClass) {
      throw new Error(`AjaxPostActionHandler: action type is not defined!`);
    }

    const actionService: AjaxPostActionHandler = this.injector.get(actionClass);

    actionService?.handleAction(response.postAction, injector ?? this.injector);
  }
}
