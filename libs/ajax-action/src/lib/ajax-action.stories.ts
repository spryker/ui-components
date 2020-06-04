import { NgModule, Component, Input, OnChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AjaxActionModule } from './ajax-action.module';
import { AjaxActionService } from './ajax-action.service';
import { AjaxPostActionRedirectService } from '../../post-actions//src/ajax-post-action-redirect';

import { NotificationModule } from '../../../notification/src/lib/notification.module';
import { NotificationWrapperComponent } from '../../../notification/src/lib/notification-wrapper/notification-wrapper.component';

export default {
  title: 'AjaxActionComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    <button (click)="clickHandler()">TestButton</button>
  `,
  providers: [],
})
class StoryComponent {
  constructor() {}

  clickHandler() {
    console.log('clicked');
  }
}

@NgModule({
  imports: [
    NotificationModule.forRoot(),
    AjaxActionModule.withActions({
      redirect: AjaxPostActionRedirectService,
    }),
  ],
  declarations: [StoryComponent, NotificationWrapperComponent],
  exports: [NotificationModule],
  entryComponents: [NotificationWrapperComponent],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {},
});
