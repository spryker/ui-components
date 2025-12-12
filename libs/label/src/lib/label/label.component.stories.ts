import { Meta, moduleMetadata } from '@storybook/angular';
import { LabelComponent } from './label.component';
import { LabelModule } from '../label.module';

export default {
    title: 'LabelComponent',
    component: LabelComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [LabelModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['for', 'labelText'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=303%3A632',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Label component for form controls.\n\n**Slots:**\n- Default slot: Label text content',
            },
        },
    },
    argTypes: {
        for: {
            control: { type: 'text' },
            description: 'ID of the form element this label is associated with',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
    },
    args: {
        for: 'id',
        labelText: 'Label content *',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-label [for]="for">
        {{ labelText }}
    </spy-label>
  `,
});
