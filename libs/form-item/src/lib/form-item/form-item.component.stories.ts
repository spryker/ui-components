import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormItemModule } from '@spryker/form-item';
import { InputModule } from '@spryker/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

export default {
  title: 'FormItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      FormItemModule,
      BrowserAnimationsModule,
      NzFormModule,
      NzInputModule,
      InputModule,
    ],
  },
  template: `
    <spy-form-item for="input-id" error="Error Message" [noLabel]="true">
      Label
      <spy-input placeholder="placeholder" attrs='{"id":"form-id"}' type="text" control></spy-input>
    </spy-form-item>
   <spy-form-item for="input-id" error="Error Message" [noSpaces]="true">
      Label
      <spy-input attrs='{"id":"form-id2"}' type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item for="input-id" error="Error Message">
      Label
      <spy-input attrs='{"id":"form-id3"}' type="text" control></spy-input>
    </spy-form-item>
  `,
});
