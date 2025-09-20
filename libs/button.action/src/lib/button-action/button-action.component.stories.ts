import { importProvidersFrom, Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '@spryker/button';

import { ButtonActionComponent } from './button-action.component';
import { ButtonActionModule } from '../button-action.module';

@Injectable({
    providedIn: 'root',
})
class MockActionHandlerService implements ActionHandler {
    handleAction(injector: Injector, config: ActionConfig): Observable<void> {
        const action = document.getElementsByClassName('action')[0];

        action.innerHTML = `
      ${config.type}
      ${config.component}
      ${(config.options as Record<string, string>).url}
    `;

        return EMPTY;
    }
}

export default {
    title: 'ButtonActionComponent',
    component: ButtonActionComponent,
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    ActionsModule.withActions({
                        mock: MockActionHandlerService,
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
            include: ['variant', 'size', 'shape', 'type', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
            allowFullscreen: true,
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(ButtonVariant),
        },
        size: {
            control: { type: 'select' },
            options: Object.values(ButtonSize),
        },
        shape: {
            control: { type: 'select' },
            options: Object.values(ButtonShape),
        },
        type: {
            control: { type: 'select' },
            options: Object.values(ButtonType),
        },
    },
    args: {
        variant: ButtonVariant.Primary,
        size: ButtonSize.Medium,
        shape: ButtonShape.Default,
        type: ButtonType.Button,
        attrs: { name: 'custom-name' },
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        action: {
            type: 'mock',
            component: 'component',
            options: {
                url: '/html-request',
            },
        },
    },
    template: `
    <spy-button-action
      [action]="action"
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [type]="type"
      [attrs]="attrs"
    >Show action config</spy-button-action>
    <div class="action"></div>
  `,
});
