import { Meta } from '@storybook/angular';
import { ButtonIconModule } from '../button-icon.module';
import { ButtonIconComponent } from './button-icon.component';
import { ButtonSize, ButtonType } from '@spryker/button';
import { IconPlusModule } from '@spryker/icon/icons';

export default {
    title: 'ButtonIconComponent',
    component: ButtonIconComponent,
    parameters: {
        controls: {
            include: ['size', 'type', 'disabled', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9332',
            allowFullscreen: true,
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ButtonSize,
        },
        type: {
            control: { type: 'select' },
            options: ButtonType,
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
