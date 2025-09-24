import { ActionConfig } from '@spryker/actions';
import { NotificationData } from '@spryker/notification';

export interface NotificationActionConfig extends ActionConfig {
    notifications: NotificationData[];
}
