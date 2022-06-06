import { CheckboxModule } from '../checkbox.module';

export default {
    title: 'CheckboxComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [CheckboxModule],
    },
    template: `
    <spy-checkbox [name]="name" [attrs]="attrs">Checkbox label</spy-checkbox>
  `,
    props: {
        name: 'some-name',
        attrs: {
            attr1: 'attr1',
        },
    },
});
