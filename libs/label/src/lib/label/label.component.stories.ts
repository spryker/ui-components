import { Meta, moduleMetadata } from '@storybook/angular';
import { LabelComponent } from './label.component';
import { LabelModule } from '../label.module';

export default {
    title: 'LabelComponent',
    component: LabelComponent,
    decorators: [
        moduleMetadata({
            imports: [LabelModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=303%3A632',
            allowFullscreen: true,
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
