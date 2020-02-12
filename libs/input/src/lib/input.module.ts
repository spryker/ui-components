import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AttrParser } from '@spryker-ui/utils';

@NgModule({
  imports: [NzInputModule],
  declarations: [InputComponent, AttrParser],
  exports: [InputComponent],
})
export class InputModule {}
