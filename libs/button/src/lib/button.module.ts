import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [NzButtonModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule {}
