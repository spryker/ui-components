import { boolean, select } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplyContextsModule } from '@spryker/utils';

import { NotificationModule } from '../notification.module';

export default {
    title: 'NotificationViewComponent',
};

@NgModule({
    imports: [BrowserAnimationsModule],
    exports: [NotificationModule],
})
class StoryModule {}

export const primary = () => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-notification-view [type]="type" [closeable]="closeable">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification-view>
  `,
    props: {
        type: select(
            'Type',
            {
                Info: 'info',
                Error: 'error',
                Warning: 'warning',
                Success: 'success',
            },
            'info',
        ),
        closeable: boolean('Closeable', false),
    },
});

export const inWhiteBackground = () => ({
    moduleMetadata: { imports: [StoryModule, ApplyContextsModule] },
    template: `
    <div spyApplyContexts="spy-bg-white" style="padding: 100px">
      <spy-notification-view>
        <span title>Title...</span>
        <span description>Description...</span>
      </spy-notification-view>
    </div>
  `,
});

export const inGrayBackground = () => ({
    moduleMetadata: { imports: [StoryModule, ApplyContextsModule] },
    template: `
    <div spyApplyContexts="spy-bg-gray">
      <div spyApplyContexts="spy-bg-white">
        <div spyApplyContexts="spy-bg-gray" style="padding: 100px">
          <spy-notification-view>
            <span title>Title...</span>
            <span description>Description...</span>
          </spy-notification-view>
        </div>
      </div>
    </div>
  `,
});
