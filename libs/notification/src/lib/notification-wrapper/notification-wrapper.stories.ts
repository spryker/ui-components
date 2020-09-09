import { NgModule, Component, Input, OnChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationWrapperComponent } from './notification-wrapper.component';

import { select, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'NotificationWrapperComponent',
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'story-selector',
  template: `
    <button (click)="notificationService.show(data)">TestButton</button>
  `,
})
class StoryComponent implements OnChanges {
  constructor(public notificationService: NotificationService) {}
  @Input() type?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() closeable?: boolean;

  data: any;

  ngOnChanges() {
    this.data = {
      description: this.description,
      type: this.type,
      title: this.title,
      closeable: this.closeable,
    };
  }
}

@NgModule({
  imports: [BrowserAnimationsModule, NotificationModule.forRoot()],
  declarations: [StoryComponent],
  exports: [NotificationModule],
  entryComponents: [NotificationWrapperComponent],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {
    type: select(
      'Type',
      { Info: 'info', Error: 'error', Warning: 'warning', Success: 'success' },
      'info',
    ),
    title: text('Text', 'Test Title'),
    description: text('Description', 'Test Description'),
    closeable: boolean('Closeable', true),
  },
});
