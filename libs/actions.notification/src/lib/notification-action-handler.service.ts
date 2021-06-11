import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { NotificationRef, NotificationService } from '@spryker/notification';
import { AnyContext, ContextService } from '@spryker/utils';
import { Observable, of } from 'rxjs';

import { NotificationActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class NotificationActionHandlerService
  implements ActionHandler<unknown, NotificationRef[]> {
  handleAction(
    injector: Injector,
    config: NotificationActionConfig,
    context: unknown,
  ): Observable<NotificationRef[]> {
    const contextService = injector.get(ContextService, null);
    const notificationService = injector.get(NotificationService, null);
    const notificationRefs: NotificationRef[] = [];

    if (!contextService) {
      throw new Error(`NotificationActionHandler: ContextService not found`);
    }

    if (!notificationService) {
      throw new Error(
        `NotificationActionHandler: NotificationService not found`,
      );
    }

    for (const data of config.notifications) {
      const notificationData = { ...data };

      notificationData.title = contextService.interpolate(
        String(notificationData.title),
        context as AnyContext,
      );

      if (notificationData.description) {
        notificationData.description = contextService.interpolate(
          String(notificationData.description),
          context as AnyContext,
        );
      }

      const notificationRef = notificationService.show(notificationData);

      notificationRefs.push(notificationRef);
    }

    return of(notificationRefs);
  }
}
