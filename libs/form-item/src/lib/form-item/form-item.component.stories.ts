import { NzFormModule } from 'ng-zorro-antd/form';
import { FormItemComponent } from './form-item.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormItemModule } from '@spryker/form-item';
import { InputModule } from '@spryker/input';

export default {
  title: 'FormItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [FormItemModule, NzFormModule, NzInputModule, InputModule],
  },
  template: `
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input attrs='{"id":"form-id"}' type="text" control></spy-input>
    </spy-form-item>
   <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input attrs='{"id":"form-id2"}' type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input attrs='{"id":"form-id3"}' type="text" control></spy-input>
    </spy-form-item>
  `,
});
