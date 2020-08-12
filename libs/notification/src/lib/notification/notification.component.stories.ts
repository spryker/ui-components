import { boolean, select } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from '../notification.module';
import { NotificationWrapperComponent } from '../notification-wrapper/notification-wrapper.component';
import { ApplyContextsModule } from '@spryker/utils';

export default {
  title: 'NotificationComponent',
};

@NgModule({
  imports: [BrowserAnimationsModule, NotificationModule.forRoot()],
  exports: [NotificationModule],
  entryComponents: [NotificationWrapperComponent],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification
      [type]="type"
      [closeable]="closeable"
      [floatingConfig]="floatingConfig"
    >
      <div description style="color: red">  Description...</div>
      <ng-template #titleTpl>
       <div style="color: red"> Title Template</div>
      </ng-template>
    </spy-notification>
  `,
  props: {
    type: 'info',
    closeable: true,
    floatingConfig: {
      timeOut: 3000,
      position: 'topRight',
      easing: 'ease-in',
      easeTime: 300,
      disableTimeOut: undefined,
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
    type: select(
      'Type',
      { Info: 'info', Error: 'error', Warning: 'warning', Success: 'success' },
      'info',
    ),
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
