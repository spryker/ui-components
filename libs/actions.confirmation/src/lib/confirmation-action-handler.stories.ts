import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { RedirectActionHandlerService } from '@spryker/actions.redirect';
import { ButtonActionModule } from '@spryker/button.action';
import { ModalModule } from '@spryker/modal';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';

import { ConfirmationActionHandlerService } from './confirmation-action-handler.service';

const url = 'https://spryker.com';

export default {
    title: 'ConfirmationActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        confirmation: ConfirmationActionHandlerService,
                        redirect: RedirectActionHandlerService,
                    }),
                ),
                importProvidersFrom(ModalModule.forRoot()),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [ButtonActionModule, ModalModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['action', 'actionContext'],
        },
    },
    args: {
        action: {
            type: 'confirmation',
            action: {
                type: 'redirect',
                url,
            },
            modal: {
                description: 'Redirect to ${url}',
                okVariant: 'primary',
            },
        },
        actionContext: {
            url,
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
        <spy-button-action
          [action]="action"
          [actionContext]="actionContext"
          variant="primary"
          size="lg"
        >
            Redirect with Confirmation
        </spy-button-action>
    `,
});
