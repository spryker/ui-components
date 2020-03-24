import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplyAttrsModule } from '@spryker/utils';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NzInputModule, ApplyAttrsModule, FormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
