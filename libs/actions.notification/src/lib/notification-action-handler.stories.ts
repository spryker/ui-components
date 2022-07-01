import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { NotificationModule, NotificationType, NotificationWrapperComponent } from '@spryker/notification';
import { ContextService } from '@spryker/utils';

import { NotificationActionHandlerService } from './notification-action-handler.service';

export default {
    title: 'NotificationActionHandlerService',
    parameters: {
        controls: {
            include: ['action'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8980',
            allowFullscreen: true,
        },
    },
    args: {
        action: {
            type: 'notification',
            notifications: [
                {
                    title: 'Notification title 1',
                    description: 'Notification description 1',
                    closeable: true,
                },
                {
                    type: NotificationType.Success,
                    title: 'Notification title 2',
                    description: 'Notification description 2',
                },
            ],
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
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
});
