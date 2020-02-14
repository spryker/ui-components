import { NzFormModule } from 'ng-zorro-antd/form';
import { FormItemComponent } from './form-item.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormItemModule } from '@spryker/form-item';

export default {
  title: 'FormItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [FormItemModule, NzFormModule, NzInputModule],
  },
  template: `
    <spy-form-item for="input-id" error="Error Message">
      Label
      <input nz-input="" id="input-id" type="text" control>
    </spy-form-item>
  `,
});
