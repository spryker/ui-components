import { Meta } from '@storybook/angular';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonLinkComponent } from './button-link.component';
import { ButtonLinkModule } from './button-link.module';

export default {
    title: 'ButtonLinkComponent',
    component: ButtonLinkComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'url', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Button link component that renders as an anchor tag with button styling.\n\n**Slots:**\n- Default slot: Button text content\n- `[icon]`: Icon element (optional)',
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
        url: {
            control: { type: 'text' },
            description: 'URL for the link',
            table: {
                type: { summary: 'string' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes for the anchor element',
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
        url: 'https://spryker.com/',
        attrs: { target: '_blank' },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [ButtonLinkModule],
    },
    template: `
    <spy-button-link
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [url]="url"
      [attrs]="attrs"
    >Button</spy-button-link>
  `,
});
