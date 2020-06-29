import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { HeadlineModule } from '../headline.module';

export default {
  title: 'HeadlineComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [HeadlineModule, NzLayoutModule],
  },
  template: `
    <spy-headline>
      <h1>Title Content</h1>
      <div actions>Actions Content</div>
    </spy-headline>
  `,
});
