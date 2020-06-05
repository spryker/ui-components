import { NgModule, Component, Injectable, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjaxActionModule } from './ajax-action.module';
import { AjaxActionService } from './ajax-action.service';
import { AjaxPostActionRedirect } from '../../post-actions//src/ajax-post-action-redirect';
import { NotificationModule } from '@spryker/notification';
import { NotificationWrapperComponent } from '../../../notification/src/lib/notification-wrapper/notification-wrapper.component';

export default {
  title: 'AjaxActionComponent',
};

@Injectable({
  providedIn: 'root',
})
class AjaxPostActionMockService {
  constructor() {}

  handleAction(action: AjaxPostActionRedirect): void {
    // tslint:disable-next-line: no-non-null-assertion
    document.getElementById(
      'test-id',
    )!.innerHTML += `<div>${action.random}</div>`;
  }
}

@Component({
  selector: 'spy-story',
  template: `
    <button (click)="clickHandler()">
      Show random number with notifications
    </button>
    <div id="test-id"></div>
  `,
  providers: [AjaxActionService],
})
class StoryComponent {
  constructor(
    private injector: Injector,
    private ajaxActionService: AjaxActionService,
  ) {}

  clickHandler() {
    const random = Math.random().toFixed(4);

    const actionObject = {
      postAction: {
        type: 'mock',
        random,
      },
      notifications: [
        {
          type: 'info' as any,
          message: `Random value is ${random}`,
        },
      ],
    };

    this.ajaxActionService.handle(actionObject, this.injector);
  }
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NotificationModule.forRoot(),
    AjaxActionModule.withActions({
      mock: AjaxPostActionMockService,
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
