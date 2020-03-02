import { CheckboxModule } from '../checkbox.module';

export default {
  title: 'CheckboxComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CheckboxModule],
  },
  template: `
    <spy-checkbox>Chackbox label</spy-checkbox>
  `,
  props: {},
});
