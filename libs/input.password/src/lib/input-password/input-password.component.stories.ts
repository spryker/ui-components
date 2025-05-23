import { Meta, moduleMetadata } from '@storybook/angular';
import { InputPasswordModule } from '../input-password.module';
import { InputPasswordComponent } from './input-password.component';

export default {
    title: 'InputPasswordComponent',
    component: InputPasswordComponent,
    decorators: [
        moduleMetadata({
            imports: [InputPasswordModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'name',
                'value',
                'spyId',
                'placeholder',
                'outerPrefix',
                'outerSuffix',
                'readOnly',
                'disabled',
                'required',
                'attrs',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9150',
            allowFullscreen: true,
        },
    },
    argTypes: {
        outerPrefix: {
            control: { type: 'text' },
        },
        outerSuffix: {
            control: { type: 'text' },
        },
        attrs: {
            control: { type: 'object' },
        },
        readOnly: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
    },
    args: {
        name: 'input-name',
        value: 'Password',
        spyId: 'input-id',
        placeholder: 'Enter password',
        outerPrefix: '',
        outerSuffix: '',
        attrs: {
            title: 'Some title',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withOuterPrefixAndOuterSuffix = (args) => ({
    props: args,
});
withOuterPrefixAndOuterSuffix.args = {
    outerPrefix: 'prefix',
    outerSuffix: 'suffix',
};
