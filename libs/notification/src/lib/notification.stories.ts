import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from './notification.module';
import { NotificationService } from './notification.service';
import { NotificationWrapperComponent } from './notification-wrapper/notification-wrapper.component';

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
class StoryComponent {
  constructor(public notificationService: NotificationService) {}

  data = {
    description: 'Test description',
    type: 'info',
    title: 'Test title',
    closeable: true,
  };
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
});
