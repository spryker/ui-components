import { Meta, moduleMetadata } from '@storybook/angular';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from '../layout.module';

export default {
    title: 'LayoutComponent',
    component: LayoutComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [LayoutModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Main layout container component.\n\n**Slots:**\n- Default slot: Layout content (header, sidebar, content, footer)',
            },
        },
    },
    argTypes: {},
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-layout>
      Layout Content
    </spy-layout>
  `,
});
