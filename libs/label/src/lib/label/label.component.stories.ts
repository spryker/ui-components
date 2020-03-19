import { LabelModule } from '../label.module';

export default {
  title: 'LabelComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [LabelModule],
    declaration: [],
  },
  template: `
    <spy-label for="id">
        Label content *
    </spy-label>
  `,
});
