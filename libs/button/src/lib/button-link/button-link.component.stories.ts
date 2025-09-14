import { Meta } from '@storybook/angular';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonLinkComponent } from './button-link.component';
import { ButtonLinkModule } from './button-link.module';

export default {
    title: 'ButtonLinkComponent',
    component: ButtonLinkComponent,
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'url', 'attrs'],
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
