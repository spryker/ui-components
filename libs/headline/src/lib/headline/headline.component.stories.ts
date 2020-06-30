import { HeadlineModule } from '../headline.module';

export default {
  title: 'HeadlineComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [HeadlineModule],
  },
  template: `
    <spy-headline>
      <h1>Title Content</h1>
      <div actions>Actions Content</div>
    </spy-headline>
  `,
});
