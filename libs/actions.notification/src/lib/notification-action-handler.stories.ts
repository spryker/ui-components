import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { NotificationModule, NotificationType, NotificationWrapperComponent } from '@spryker/notification';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { ContextService } from '@spryker/utils';

import { NotificationActionHandlerService } from './notification-action-handler.service';

export default {
    title: 'NotificationActionHandlerService',
};

export const primary = (): IStory => ({
    moduleMetadata: {
        imports: [
            BrowserAnimationsModule,
            ButtonActionModule,
            NotificationModule.forRoot(),
            ActionsModule.withActions({
                notification: NotificationActionHandlerService,
            }),
        ],
        providers: [ContextService],
        entryComponents: [NotificationWrapperComponent],
    },
    template: `
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Get Notifications Via Service
    </spy-button-action>
  `,
    props: {
        action: object('action', {
            type: 'notification',
            notifications: [
                {
                    type: NotificationType.Info,
                    title: 'Notification title 1',
                    description: 'Notification description 1',
                    closeable: true,
                },
                {
                    type: NotificationType.Success,
                    title: 'Notification title 2',
                    description: 'Notification description 2',
                    closeable: false,
                },
            ],
        }),
    },
});
