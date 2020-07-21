import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplyContextsModule } from '@spryker/utils';

import { NotificationModule } from '../notification.module';

export default {
  title: 'NotificationComponent',
};

@NgModule({
  imports: [BrowserAnimationsModule],
  exports: [NotificationModule],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification>
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});

export const closeable = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification closeable>
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});

export const error = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification type="error">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});

export const warning = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification type="warning">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});

export const success = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-notification type="success">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});

export const inWhiteBackground = () => ({
  moduleMetadata: { imports: [StoryModule, ApplyContextsModule] },
  template: `
    <div spyApplyContexts="spy-bg-white" style="padding: 100px">
      <spy-notification>
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
          <spy-notification>
            <span title>Title...</span>
            <span description>Description...</span>
          </spy-notification>
        </div>
    </div>
    </div>
  `,
});
