import { storiesOf } from '@storybook/angular';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TestComponent } from './test.component';

storiesOf('TestComponent', module).add('default', () => ({
  moduleMetadata: {
    imports: [NzInputModule]
  },
  component: TestComponent,
  props: {}
}));
