import { Meta, moduleMetadata } from '@storybook/angular';
import { InputModule } from '../input.module';
import { InputComponent } from './input.component';

export default {
    title: 'InputComponent',
    component: InputComponent,
    decorators: [
        moduleMetadata({
            imports: [InputModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'name',
                'value',
                'type',
                'spyId',
                'placeholder',
                'outerPrefix',
                'outerSuffix',
                'prefix',
                'suffix',
                'readOnly',
                'disabled',
                'required',
                'attrs',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9147',
            allowFullscreen: true,
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
        },
        outerPrefix: {
            control: { type: 'text' },
        },
        outerSuffix: {
            control: { type: 'text' },
        },
        prefix: {
            control: { type: 'text' },
        },
        suffix: {
            control: { type: 'text' },
        },
    },
    args: {
        name: 'input-name',
        type: 'text',
        spyId: 'input-id',
        placeholder: 'Some placeholder',
        outerPrefix: '',
        outerSuffix: '',
        prefix: '',
        suffix: '',
        attrs: {
            title: 'Some title',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withPrefixAndSuffix = (args) => ({
    props: args,
});
withPrefixAndSuffix.args = {
    prefix: 'P',
    suffix: 'S',
};

export const withOuterPrefixAndOuterSuffix = (args) => ({
    props: args,
});
withOuterPrefixAndOuterSuffix.args = {
    outerPrefix: 'prefix',
    outerSuffix: 'suffix',
};
