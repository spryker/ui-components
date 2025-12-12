import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ApplyContextsModule } from '@spryker/utils';
import { NotificationModule } from '../notification.module';
import { NotificationViewComponent } from './notification-view.component';
import { NotificationType } from '../types';

export default {
    title: 'NotificationViewComponent',
    component: NotificationViewComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [NotificationModule],
        }),
    ],
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
            options: Object.values(NotificationType),
        },
    },
    args: {
        title: 'Title Template',
        description: 'Description...',
        type: NotificationType.Info,
        closeable: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
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
        imports: [ApplyContextsModule],
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
        imports: [ApplyContextsModule],
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
