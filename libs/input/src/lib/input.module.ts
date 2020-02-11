import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [NzInputModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
