import { Component, Injectable, Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { Observable, of } from 'rxjs';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { AjaxActionService } from './ajax-action.service';

@Injectable({
  providedIn: 'root',
})
class ActionMockService implements ActionHandler<unknown, void> {
  handleAction(injector: Injector, action: ActionConfig): Observable<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById(
      'test-id',
    )!.innerHTML += `<div>${action.random}</div>`;

    return of(void 0);
  }
}

@Component({
  selector: 'spy-story',
  template: `
    <button (click)="clickHandler()">Click to show random number</button>
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
      actions: [
        {
          type: 'mock',
          random,
        },
      ],
    };

    this.ajaxActionService.handle(actionObject, this.injector);
  }
}

export default {
  title: 'AjaxActionComponent',
  component: StoryComponent,
} as Meta;

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ActionsModule.withActions({
      mock: ActionMockService,
    }),
  ],
  exports: [StoryComponent],
  declarations: [StoryComponent],
})
class StoryModule {}

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [StoryModule],
  },
});
