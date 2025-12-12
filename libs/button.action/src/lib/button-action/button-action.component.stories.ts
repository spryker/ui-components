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
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'type', 'attrs', 'action'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Button that triggers configured actions from the Actions system.\n\n**Slots:**\n- Default slot: Button text content\n- `[icon]`: Icon element (optional)',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(ButtonVariant),
            description: 'Visual style of the button (primary, secondary, critical, link, outline, critical-outline)',
            table: {
                type: { summary: 'ButtonVariant' },
                defaultValue: { summary: 'ButtonVariant.Primary' },
                category: 'Inputs',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(ButtonSize),
            description: 'Size of the button (sm, md, lg)',
            table: {
                type: { summary: 'ButtonSize' },
                defaultValue: { summary: 'ButtonSize.Medium' },
                category: 'Inputs',
            },
        },
        shape: {
            control: { type: 'select' },
            options: Object.values(ButtonShape),
            description: 'Shape of the button (default, round, circle)',
            table: {
                type: { summary: 'ButtonShape' },
                defaultValue: { summary: 'ButtonShape.Default' },
                category: 'Inputs',
            },
        },
        type: {
            control: { type: 'select' },
            options: Object.values(ButtonType),
            description: 'HTML button type attribute (button, submit, reset)',
            table: {
                type: { summary: 'ButtonType' },
                defaultValue: { summary: 'ButtonType.Button' },
                category: 'Inputs',
            },
        },
        action: {
            control: { type: 'object' },
            description: 'Action configuration to execute on button click',
            table: {
                type: { summary: 'ActionConfig' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes for the button element',
            table: {
                type: { summary: 'Record<string, string>' },
                category: 'Inputs',
            },
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
