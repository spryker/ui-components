import { Meta, moduleMetadata } from '@storybook/angular';
import { LogoModule } from '../logo.module';
import { LogoComponent } from './logo.component';

export default {
    title: 'LogoComponent',
    component: LogoComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [LogoModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['size'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=3228%3A11344',
            allowFullscreen: true,
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['full', 'icon'],
            description: 'Display mode of the logo (full, icon)',
            table: {
                type: { summary: '"full" | "icon"' },
                defaultValue: { summary: '"full"' },
                category: 'Inputs',
            },
        },
    },
    args: {
        size: 'full',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <div style="width: 160px; height: 62px;">
      <spy-logo [size]="size"></spy-logo>
    </div>
  `,
});
