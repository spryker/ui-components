import { NgModule, Component, Input, OnChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationWrapperComponent } from './notification-wrapper.component';

import { select, text, boolean, number } from '@storybook/addon-knobs';
import { NotificationData, NotificationType } from '../types';

export default {
  title: 'NotificationWrapperComponent',
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'story-selector',
  template: `
    <button (click)="notificationService.show(data)">Show Notification</button>
  `,
})
class StoryComponent implements OnChanges {
  constructor(public notificationService: NotificationService) {}
  @Input() title = '';
  @Input() type?: NotificationType;
  @Input() description?: string;
  @Input() closeable?: boolean;
  @Input() timeOut?: number;

  data: NotificationData = {
    title: this.title,
  };

  ngOnChanges() {
    this.data.type = this.type;
    this.data.title = this.title;
    this.data.description = this.description;
    this.data.closeable = this.closeable;
    this.data.timeOut = this.timeOut;
  }
}

@NgModule({
  imports: [BrowserAnimationsModule, NotificationModule.forRoot()],
  declarations: [StoryComponent],
  exports: [NotificationModule, StoryComponent],
  entryComponents: [NotificationWrapperComponent],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {
    type: select('Type', NotificationType, NotificationType.Info),
    title: text('Text', 'Test Title'),
    description: text('Description', 'Test Description'),
    closeable: boolean('Closeable', true),
    timeOut: number('Timeout (ms)', 3000),
  },
});
