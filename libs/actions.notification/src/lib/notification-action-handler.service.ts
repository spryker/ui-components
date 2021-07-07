import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { NotificationRef, NotificationService } from '@spryker/notification';
import { AnyContext, ContextService, mergeDeep } from '@spryker/utils';
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
    config = mergeDeep({}, config);

    const contextService = injector.get(ContextService);
    const notificationService = injector.get(NotificationService);
    const notificationRefs: NotificationRef[] = [];

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

      if (notificationRef) {
        notificationRefs.push(notificationRef);
      }
    }

    return of(notificationRefs);
  }
}
