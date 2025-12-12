import { Meta, moduleMetadata } from '@storybook/angular';
import { TagModule } from '../tag.module';

export default {
    title: 'TagComponent',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [TagModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['disabled', 'removable'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2252%3A7539',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Tag component for labels and removable items.\n\n**Slots:**\n- Default slot: Tag label text',
            },
        },
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the tag preventing remove interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        removable: {
            control: { type: 'boolean' },
            description: 'Shows remove/close button on the tag',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Inputs',
            },
        },
        remove: {
            description: 'Emits when remove button is clicked',
            table: {
                type: { summary: 'EventEmitter<MouseEvent>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        disabled: false,
        removable: true,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-tag [removable]="removable" [disabled]="disabled">This is a tag</spy-tag>
  `,
});
