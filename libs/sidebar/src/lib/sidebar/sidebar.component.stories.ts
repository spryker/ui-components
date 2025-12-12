import { Meta, moduleMetadata } from '@storybook/angular';
import { IconModule } from '@spryker/icon';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from '../sidebar.module';

export default {
    title: 'SidebarComponent',
    component: SidebarComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [SidebarModule, IconModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['width', 'collapsedWidth', 'spyId', 'collapsed', 'trigger', 'innerText'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8992',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Collapsible sidebar component with customizable width.\n\n**Slots:**\n- Default slot: Sidebar content',
            },
        },
    },
    argTypes: {
        width: {
            control: { type: 'number' },
            description: 'Width of the sidebar in pixels when expanded',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '250' },
                category: 'Inputs',
            },
        },
        collapsedWidth: {
            control: { type: 'number' },
            description: 'Width of the sidebar in pixels when collapsed',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '96' },
                category: 'Inputs',
            },
        },
        spyId: {
            control: { type: 'text' },
            description: 'Unique identifier for persisting collapse state',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        trigger: {
            description: 'Custom template for collapse/expand trigger',
            table: {
                type: { summary: 'TemplateRef<void>' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        collapsed: {
            control: { type: 'boolean' },
            description: 'Controls collapsed/expanded state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        collapsedChange: {
            description: 'Emits when collapsed state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        spyId: 'someId',
        innerText: 'SideBar Content',
        width: 250,
        collapsedWidth: 96,
        collapsed: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
        <spy-sidebar
            [width]="width"
            [collapsedWidth]="collapsedWidth"
            [spyId]="spyId"
            [collapsed]="collapsed"
        >
            <div>{{ innerText }}</div>
        </spy-sidebar>
    `,
});
