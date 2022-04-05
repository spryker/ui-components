import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplyContextsModule } from '@spryker/utils';
import { boolean, number, select } from '@storybook/addon-knobs';

import { NotificationWrapperComponent } from '../notification-wrapper/notification-wrapper.component';
import { NotificationModule } from '../notification.module';
import {
  NotificationEasing,
  NotificationPosition,
  NotificationType,
} from '../types';

export default {
  title: 'NotificationComponent',
};

@NgModule({
  imports: [BrowserAnimationsModule, NotificationModule.forRoot()],
  exports: [NotificationModule],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification
      [floating]="floating"
      [type]="type"
      [closeable]="closeable"
      [floatingConfig]="floatingConfig"
      #notification
    >
      <ng-template #titleTpl>
        <div style="color: red"> Title Template</div>
      </ng-template>
      <div description style="color: red">  Description...</div>
    </spy-notification>
    <button (click)="notification.close()">Close</button>
  `,
  props: {
    floating: boolean('Floating', true),
    type: select('Type', NotificationType, NotificationType.Info),
    closeable: boolean('Closeable', true),
    floatingConfig: {
      position: select(
        'Position',
        NotificationPosition,
        NotificationPosition.TopRight,
      ),
      timeOut: number('Timeout (ms)', 3000),
      disableTimeOut: boolean('Disable Timeout', false),
      easing: select('Easing', NotificationEasing, NotificationEasing.EaseIn),
      easeTime: number('Ease time (ms)', 300),
    },
  },
});

export const staticNotification = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification
      [type]="type"
      [closeable]="closeable"
      floating="false"
    >
      <div description style="color: red">  Description...</div>
      <div title style="color: green">Title...</div>
    </spy-notification>
  `,
  props: {
    type: select('Type', NotificationType, NotificationType.Info),
    closeable: boolean('Closeable', false),
  },
});

export const inWhiteBackground = () => ({
  moduleMetadata: { imports: [StoryModule, ApplyContextsModule] },
  template: `
    <div spyApplyContexts="spy-bg-white" style="padding: 100px">
      <spy-notification floating="false">
        <span title>Title...</span>
        <span description>Description...</span>
      </spy-notification>
    </div>
  `,
});

export const inGrayBackground = () => ({
  moduleMetadata: { imports: [StoryModule, ApplyContextsModule] },
  template: `
    <div spyApplyContexts="spy-bg-gray">
      <div spyApplyContexts="spy-bg-white">
        <div spyApplyContexts="spy-bg-gray" style="padding: 100px">
          <spy-notification floating="false">
            <span title>Title...</span>
            <span description>Description...</span>
          </spy-notification>
        </div>
      </div>
    </div>
  `,
});
