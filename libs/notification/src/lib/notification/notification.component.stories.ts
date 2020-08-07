import { boolean, select, text, object } from '@storybook/addon-knobs';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from '../notification.module';
import { NotificationWrapperComponent } from '../notification-wrapper/notification-wrapper.component';

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
      [floating]="floating"
      [title]="title"
      [description]="description"
      [floatingConfig]="floatingConfig"
    >
    </spy-notification>
  `,
  props: {
    type: select(
      'Type',
      { Info: 'info', Error: 'error', Warning: 'warning', Success: 'success' },
      'info',
    ),
    closeable: boolean('Closeable', false),
    floating: boolean('Floating', true),
    title: text('Title', 'Title...'),
    description: text('Description', 'Description...'),
    floatingConfig: object('FloatingConfig', {
      timeOut: 3000,
      position: 'topRight',
      easing: 'ease-in',
      easeTime: 300,
      disableTimeOut: undefined,
    }),
  },
});
