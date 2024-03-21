import { Meta, moduleMetadata } from '@storybook/angular';
import { ToggleModule } from '../toggle.module';
import { ToggleComponent } from './toggle.component';

export default {
    title: 'ToggleComponent',
    component: ToggleComponent,
    decorators: [
        moduleMetadata({
            imports: [ToggleModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['value', 'disabled', 'name'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2890%3A11773',
            allowFullscreen: true,
        },
    },
    args: {
        name: 'toggle-name',
        disabled: false,
        value: '',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withLabel = (args) => ({
    props: args,
    template: `
    <spy-toggle [value]="value" [disabled]="disabled" [name]="name">Label</spy-toggle>
  `,
});
