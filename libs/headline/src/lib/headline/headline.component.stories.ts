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
      Title Content
      <div actions>Actions Content</div>
    </spy-headline>
  `,
});
