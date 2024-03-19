import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { RedirectActionHandlerService } from './redirect-action-handler.service';

export default {
    title: 'RedirectActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        redirect: RedirectActionHandlerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [ButtonActionModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['action'],
        },
    },
    args: {
        action: {
            type: 'redirect',
            url: 'https://spryker.com',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Redirect Via Service
    </spy-button-action>
  `,
});
