import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ApplyContextsModule } from '@spryker/utils';
import { NotificationComponent } from './notification.component';
import { NotificationModule } from '../notification.module';
import { NotificationEasing, NotificationPosition, NotificationType } from '../types';

export default {
    title: 'NotificationComponent',
    component: NotificationComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(NotificationModule.forRoot())],
        }),
        moduleMetadata({
            imports: [NotificationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['type', 'closeable', 'floating', 'floatingConfig', 'title', 'description'],
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
        floatingConfig: {
            table: { disable: true },
        },
        position: {
            control: { type: 'select' },
            options: NotificationPosition,
        },
    },
    args: {
        type: NotificationType.Info,
        title: 'Title Template',
        description: 'Description...',
        floating: false,
        closeable: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-notification
      [floating]="floating"
      [type]="type"
      [closeable]="closeable"
      [floatingConfig]="floatingConfig"
      #notification
    >
      <ng-template #titleTpl>
        <div>{{ title }}</div>
      </ng-template>
      <div description>{{ description }}</div>
    </spy-notification>
    <button (click)="notification.close()">Close</button>
  `,
});
primary.args = {
    floating: true,
    floatingConfig: {
        position: NotificationPosition.TopRight,
        timeOut: 3000,
        disableTimeOut: false,
        easing: NotificationEasing.EaseIn,
        easeTime: 300,
    },
};
primary.argTypes = {
    floatingConfig: {
        table: {
            disable: false,
        },
    },
};

export const staticNotification = (args) => ({
    props: args,
    template: `
    <spy-notification
      [type]="type"
      [closeable]="closeable"
      [floating]="floating"
    >
      <div description>{{ description }}</div>
      <div title>{{ title }}</div>
    </spy-notification>
  `,
});

export const inWhiteBackground = (args) => ({
    props: args,
    moduleMetadata: { imports: [ApplyContextsModule] },
    template: `
    <div spyApplyContexts="spy-bg-white" style="padding: 100px">
      <spy-notification
        [type]="type"
        [closeable]="closeable"
        [floating]="floating"
      >
        <div title>{{ title }}</div>
        <div description>{{ description }}</div>
      </spy-notification>
    </div>
  `,
});

export const inGrayBackground = (args) => ({
    props: args,
    moduleMetadata: { imports: [ApplyContextsModule] },
    template: `
    <div spyApplyContexts="spy-bg-gray">
      <div spyApplyContexts="spy-bg-white">
        <div spyApplyContexts="spy-bg-gray" style="padding: 100px">
          <spy-notification
            [type]="type"
            [closeable]="closeable"
            [floating]="floating"
          >
            <span title>{{ title }}</span>
            <span description>{{ description }}</span>
          </spy-notification>
        </div>
      </div>
    </div>
  `,
});
