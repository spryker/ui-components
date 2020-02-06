import { NzInputModule } from 'ng-zorro-antd/input';

import { TestComponent } from './test.component';

export default {
  title: 'TestComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzInputModule],
  },
  component: TestComponent,
  props: {},
});
