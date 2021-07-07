import { ActionConfig } from '@spryker/actions';
import { NotificationData } from '@spryker/notification';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    notification: NotificationActionConfig;
  }
}

export interface NotificationActionConfig extends ActionConfig {
  notifications: NotificationData[];
}
