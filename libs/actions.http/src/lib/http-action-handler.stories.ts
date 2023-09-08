import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom, Injectable, Injector } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

import { HttpActionHandlerService } from './http-action-handler.service';

const mockResponse = () => ({
    actions: [
        {
            type: 'test',
            random: `${Math.floor(Math.random() * 100)} - random value from TestActionHandlerService`,
        },
        {
            type: 'second_test',
            random: `${Math.floor(Math.random() * 10)} - random value from SecondTestActionHandlerService`,
        },
    ],
});

@Injectable({
    providedIn: 'root',
})
class TestActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: { random: string } & ActionConfig, context: unknown): Observable<void> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('test-id')!.innerHTML = `${config.random}`;

        return of(void 0);
    }
}

@Injectable({
    providedIn: 'root',
})
class SecondTestActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: { random: string } & ActionConfig, context: unknown): Observable<void> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('second-test-id')!.innerHTML = `${config.random}`;

        return of(void 0);
    }
}

export default {
    title: 'HttpActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(
                    ActionsModule.withActions({
                        http: HttpActionHandlerService,
                        test: TestActionHandlerService,
                        second_test: SecondTestActionHandlerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [MockHttpModule, ButtonActionModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['action'],
        },
    },
    args: {
        action: {
            type: 'http',
            url: '/html-request',
            method: 'GET',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        mockHttp: setMockHttp([
            {
                url: '/html-request',
                dataFn: () => mockResponse(),
            },
        ]),
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
});
