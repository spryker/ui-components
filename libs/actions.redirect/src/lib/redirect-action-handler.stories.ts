import { Sanitizer } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { ContextService } from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { RedirectActionHandlerService } from './redirect-action-handler.service';

export default {
  title: 'RedirectActionHandlerService',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ButtonActionModule,
      ActionsModule.withActions({
        redirect: RedirectActionHandlerService,
      }),
    ],
    providers: [ContextService, Sanitizer],
  },
  template: `
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Redirect Via Service
    </spy-button-action>
  `,
  props: {
    action: object('action', {
      type: 'redirect',
      url: 'https://spryker.com',
    }),
  },
});
