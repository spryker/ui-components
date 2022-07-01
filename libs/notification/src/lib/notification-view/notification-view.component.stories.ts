import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { ApplyContextsModule } from '@spryker/utils';
import { NotificationModule } from '../notification.module';
import { NotificationViewComponent } from './notification-view.component';
import { NotificationType } from '../types';

export default {
    title: 'NotificationViewComponent',
    component: NotificationViewComponent,
    parameters: {
        controls: {
            include: ['type', 'closeable', 'title', 'description'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8980',
            allowFullscreen: true,
        },
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: NotificationType,
        },
    },
    args: {
        title: 'Title Template',
        description: 'Description...',
        type: NotificationType.Info,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: { imports: [NotificationModule, BrowserAnimationsModule] },
    template: `
    <spy-notification-view [type]="type" [closeable]="closeable">
      <span title>{{ title }}</span>
      <span description>{{ description }}</span>
    </spy-notification-view>
  `,
});

export const inWhiteBackground = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [NotificationModule, BrowserAnimationsModule, ApplyContextsModule],
    },
    template: `
    <div spyApplyContexts="spy-bg-white" style="padding: 100px">
      <spy-notification-view [type]="type" [closeable]="closeable">
        <span title>{{ title }}</span>
        <span description>{{ description }}</span>
      </spy-notification-view>
    </div>
  `,
});

export const inGrayBackground = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [NotificationModule, BrowserAnimationsModule, ApplyContextsModule],
    },
    template: `
    <div spyApplyContexts="spy-bg-gray">
      <div spyApplyContexts="spy-bg-white">
        <div spyApplyContexts="spy-bg-gray" style="padding: 100px">
          <spy-notification-view [type]="type" [closeable]="closeable">
            <span title>{{ title }}</span>
            <span description>{{ description }}</span>
          </spy-notification-view>
        </div>
      </div>
    </div>
  `,
});
