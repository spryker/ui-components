import { Meta, moduleMetadata } from '@storybook/angular';
import { TextareaModule } from '../textarea.module';
import { TextareaComponent } from './textarea.component';

export default {
    title: 'TextareaComponent',
    component: TextareaComponent,
    decorators: [
        moduleMetadata({
            imports: [TextareaModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['name', 'value', 'disabled', 'placeholder', 'rows', 'cols', 'attrs', 'spyId'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9147',
            allowFullscreen: true,
        },
    },
    args: {
        name: 'textarea-name',
        spyId: 'textarea-id',
        placeholder: 'Some placeholder',
        rows: 4,
        cols: 4,
        disabled: false,
        attrs: {
            title: 'Some title',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
