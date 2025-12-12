import { ButtonSize, ButtonType } from '@spryker/button';
import { IconPlusModule } from '@spryker/icon/icons';
import { Meta } from '@storybook/angular';
import { ButtonIconModule } from '../button-icon.module';
import { ButtonIconComponent } from './button-icon.component';

export default {
    title: 'ButtonIconComponent',
    component: ButtonIconComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['size', 'type', 'disabled', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9332',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Icon-only button component with circular shape.\n\n**Slots:**\n- `[icon]`: Icon element to display in the button',
            },
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.values(ButtonSize),
            description: 'Size of the button (sm, md, lg)',
            table: {
                type: { summary: 'ButtonSize' },
                defaultValue: { summary: 'ButtonSize.Large' },
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
        disabled: {
            control: 'boolean',
            description: 'Disables the button when true',
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
    },
    args: {
        size: ButtonSize.Large,
        type: ButtonType.Button,
        attrs: { name: 'custom-name' },
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        iconName: IconPlusModule.icon,
    },
    moduleMetadata: {
        imports: [ButtonIconModule, IconPlusModule],
    },
});
