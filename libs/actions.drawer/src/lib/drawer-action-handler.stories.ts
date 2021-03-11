import {
  HttpClientTestingModule,
  TestRequest,
} from '@angular/common/http/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component, Injector, Input,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjaxFormResponse } from '@spryker/ajax-form';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule, NzModalWrapperComponent } from '@spryker/modal';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesDrawerGuardModule } from '@spryker/unsaved-changes.guard.drawer';
import { DrawerContainerProxyComponent, DrawerModule } from '@spryker/drawer';
import { ActionsModule, ActionsService } from '@spryker/actions';

import { DrawerActionHandlerService } from './drawer-action-handler.service';
import { DrawerActionConfig } from './types';
import { DrawerActionModule } from './drawer-action.module';

export default {
  title: 'DrawerActionHandler',
};

@Component({
  selector: 'spy-test-component',
  template: `
    Test component with {{ test }} input
  `,
})
class TestComponent {
  @Input() test = '';
}

@Component({
  selector: 'spy-story',
  template: `<button (click)="openDrawer()" [mockHttp]="mockHttp">Open drawer</button>`,
})
class StoryComponent {
  @Input() mockHttp: any;

  config: DrawerActionConfig = {
    type: 'drawer',
    component: TestComponent,
    options: {
      inputs: {
        test: 'test'
      }
    }
  }

  constructor(
    private actionService: ActionsService,
    private injector: Injector
  ) {}

  openDrawer() {
    this.actionService.trigger(this.injector, this.config, {});
  }
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ActionsModule.withActions({
      'drawer': DrawerActionHandlerService,
    }),
    HttpClientTestingModule,
    MockHttpModule,
    UnsavedChangesModule.forRoot(),
    UnsavedChangesDrawerGuardModule.forRoot(),
    UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
    DrawerModule,
    DrawerActionModule,
    ModalModule.forRoot(),
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
  ],
  providers: [
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      useValue: [
        DrawerContainerProxyComponent,
        NzModalWrapperComponent,
        TestComponent,
      ],
      multi: true,
    },
  ],
  declarations: [StoryComponent, TestComponent],
})
class StoryModule {}

const mockHtmlTemplate = () => `
  <input type="text" name="name">
  <button type="submit">Submit</button>
`;

const formResponse = (request: TestRequest): AjaxFormResponse => ({
  form: mockHtmlTemplate()
});

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {
    mockHttp: setMockHttp([
      {
        url: /^\/mock-url/,
        dataFn: formResponse,
      },
    ]),
  },
});
