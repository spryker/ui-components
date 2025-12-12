import { Meta } from '@storybook/angular';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleModule } from './button-toggle.module';

export default {
    title: 'ButtonToggleComponent',
    component: ButtonToggleComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['disabled', 'toggled', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9334',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Toggle button component with on/off states.\n\n**Slots:**\n- Default slot: Button text content',
            },
        },
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the button when true',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        toggled: {
            control: { type: 'boolean' },
            description: 'Toggle state of the button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
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
        toggledChange: {
            description: 'Emits when toggle state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        disabled: false,
        toggled: false,
        attrs: { name: 'custom-name' },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [ButtonToggleModule],
    },
    template: `
    <spy-button-toggle
      [disabled]="disabled"
      [toggled]="toggled"
      [attrs]="attrs"
    >Open</spy-button-toggle>
  `,
});
