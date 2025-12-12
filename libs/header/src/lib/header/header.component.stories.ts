import { Meta, moduleMetadata } from '@storybook/angular';
import { HeaderModule } from '../header.module';

export default {
    title: 'HeaderComponent',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HeaderModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2207%3A6829',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Header component for application navigation.\n\n**Slots:**\n- Default slot: Header content (logo, navigation, user menu)',
            },
        },
    },
    argTypes: {},
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-header>
      Header Content
    </spy-header>
  `,
});
