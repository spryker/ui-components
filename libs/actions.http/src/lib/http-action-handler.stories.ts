import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { ContextService } from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { HttpActionHandlerService } from './http-action-handler.service';

export default {
  title: 'HttpActionHandlerService',
};

const mockResponse = () => ({
  actions: [
    {
      type: 'test',
      random: `${Math.floor(
        Math.random() * 100,
      )} - random value from TestActionHandlerService`,
    },
    {
      type: 'second_test',
      random: `${Math.floor(
        Math.random() * 10,
      )} - random value from SecondTestActionHandlerService`,
    },
  ],
});

@Injectable({
  providedIn: 'root',
})
class TestActionHandlerService implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: { random: string } & ActionConfig,
    context: unknown,
  ): Observable<void> {
    // tslint:disable-next-line: no-non-null-assertion
    document.getElementById('test-id')!.innerHTML = `${config.random}`;

    return of(void 0);
  }
}

@Injectable({
  providedIn: 'root',
})
class SecondTestActionHandlerService implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: { random: string } & ActionConfig,
    context: unknown,
  ): Observable<void> {
    // tslint:disable-next-line: no-non-null-assertion
    document.getElementById('second-test-id')!.innerHTML = `${config.random}`;

    return of(void 0);
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      MockHttpModule,
      HttpClientTestingModule,
      BrowserAnimationsModule,
      ButtonActionModule,
      ActionsModule.withActions({
        http: HttpActionHandlerService,
        test: TestActionHandlerService,
        second_test: SecondTestActionHandlerService,
      }),
    ],
    providers: [ContextService],
  },
  template: `
    <div id="test-id"></div>
    <div id="second-test-id"></div>
    <br />
    <br />
    <br />
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
      [mockHttp]="mockHttp"
    >
      Http Action Via Service
    </spy-button-action>
  `,
  props: {
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => mockResponse(),
      },
    ]),
    action: object('action', {
      type: 'http',
      url: '/html-request',
      method: 'GET',
    }),
  },
});
