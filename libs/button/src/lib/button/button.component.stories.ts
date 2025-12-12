import { importProvidersFrom } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';
import { Meta, moduleMetadata } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent, ButtonType } from './button.component';
import { ButtonModule } from './button.module';

export default {
    title: 'ButtonComponent',
    component: ButtonComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ButtonModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'type', 'disabled', 'loading', 'withIcon', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Button component with multiple variants, sizes, and shapes.\n\n**Slots:**\n- Default slot: Button text content\n- `[icon]`: Icon element to display before button text',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(ButtonVariant),
            description:
                'Visual style variant of the button (primary, secondary, critical, link, outline, critical-outline)',
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
            description: 'Shape style of the button (default, round, circle)',
            table: {
                type: { summary: 'ButtonShape' },
                defaultValue: { summary: 'ButtonShape.Default' },
                category: 'Inputs',
            },
        },
        type: {
            control: { type: 'select' },
            options: Object.values(ButtonType),
            description: 'HTML button type attribute (button, submit)',
            table: {
                type: { summary: 'ButtonType' },
                defaultValue: { summary: 'ButtonType.Button' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading spinner inside the button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: 'object',
            description: 'Additional HTML attributes to apply to the button element',
            table: {
                type: { summary: 'ButtonAttributes' },
                defaultValue: { summary: '{}' },
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
    props: args,
    template: `
    <spy-button
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [type]="type"
      [disabled]="disabled"
      [loading]="loading"
      [attrs]="attrs"
    ><span *ngIf="withIcon" icon>&copy;</span>Button</spy-button>
  `,
});
primary.args = {
    withIcon: false,
};

export const asWebComponent = (args) => ({
    props: args,
    applicationConfig: {
        providers: [importProvidersFrom(WebComponentsModule.withComponents([ButtonComponent]))],
    },
    template: `
      <web-spy-button
        [attr.shape]="shape"
        [attr.variant]="variant"
        [attr.size]="size"
        [attr.type]="type"
        [attr.disabled]="disabled"
        [attr.loading]="loading"
        [attr.attrs]="attrs"
      >Button text</web-spy-button>
  `,
});
asWebComponent.args = {
    attrs: '{"name": "custom-name"}',
};
