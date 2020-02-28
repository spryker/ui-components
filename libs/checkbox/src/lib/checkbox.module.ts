import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, NzCheckboxModule, ApplyAttrsModule, FormsModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
