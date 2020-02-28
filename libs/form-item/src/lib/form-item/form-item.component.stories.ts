import { NzFormModule } from 'ng-zorro-antd/form';
import { FormItemComponent } from './form-item.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormItemModule } from '@spryker/form-item';
import { InputModule } from '@spryker/input';
import { CheckboxModule } from '@spryker/checkbox';

export default {
  title: 'FormItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [FormItemModule, NzFormModule, NzInputModule, InputModule, CheckboxModule],
  },
  template: `
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-checkbox control>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</spy-checkbox>
    </spy-form-item>
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-checkbox control>Lorem Ipsum</spy-checkbox>
    </spy-form-item>
   <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input placeholder="21412" attrs='{"id":"form-id2"}' type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input attrs='{"id":"form-id3"}' type="text" control></spy-input>
    </spy-form-item>
  `,
});
