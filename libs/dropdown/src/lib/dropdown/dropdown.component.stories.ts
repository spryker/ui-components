import { provideAnimations } from '@angular/platform-browser/animations';
import { IconModule } from '@spryker/icon';
import { IconCheckModule, IconInfoModule } from '@spryker/icon/icons';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';

export default {
    title: 'DropdownComponent',
    component: DropdownComponent,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [DropdownModule, IconModule, IconCheckModule, IconInfoModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['items', 'placement', 'visible', 'disabled', 'trigger'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9154',
            allowFullscreen: true,
        },
    },
    argTypes: {
        items: {
            description: 'Array of dropdown menu items with action, title, icon, disabled, and optional subItems',
            table: {
                type: { summary: 'DropdownItem[]' },
                defaultValue: { summary: '[]' },
                category: 'Inputs',
            },
        },
        placement: {
            control: 'select',
            options: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'],
            description: 'Position of dropdown menu relative to trigger (bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight)',
            table: {
                type: { summary: 'Placement' },
                defaultValue: { summary: '"bottomRight"' },
                category: 'Inputs',
            },
        },
        trigger: {
            control: { type: 'select' },
            options: ['click', 'hover'],
            description: 'Trigger type for showing the dropdown (click, hover)',
            table: {
                type: { summary: 'Trigger' },
                defaultValue: { summary: '"hover"' },
                category: 'Inputs',
            },
        },
        visible: {
            control: { type: 'boolean' },
            description: 'Controls whether the dropdown is visible',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the dropdown',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        visibleChange: {
            description: 'Emits when dropdown visibility changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
        itemClick: {
            description: 'Emits when dropdown item is clicked with the action value',
            table: {
                type: { summary: 'EventEmitter<string>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        items: [
            { action: 'action1', title: 'item1' },
            { action: 'action2', title: 'item2' },
        ],
        placement: 'bottomRight',
        visible: false,
        disabled: false,
        trigger: 'hover',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <div style="padding: 80px; display: flex; justify-content: center;">
      <spy-dropdown
        [items]="items"
        [placement]="placement"
        [visible]="visible"
        [disabled]="disabled">
        {{ trigger }} me
      </spy-dropdown>
    </div>
  `,
});

export const withIcon = (args) => ({
    props: args,
    template: `
    <div style="padding: 80px; display: flex; justify-content: center;">
        <spy-dropdown [items]="items" [trigger]="trigger">{{ trigger }} me</spy-dropdown>
    </div>
  `,
});

withIcon.args = {
    items: [
        {
            action: 'action1',
            title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam amet consectetur harum maxime optio porro quam ratione unde velit',
            icon: IconCheckModule.icon,
        },
        {
            action: 'action2',
            title: 'One line item',
            icon: IconInfoModule.icon,
        },
        { action: 'action3', title: 'Without icon' },
    ],
};
