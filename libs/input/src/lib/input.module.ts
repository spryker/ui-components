import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, NzInputModule, ApplyAttrsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
