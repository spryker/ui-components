import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplyAttrsModule, TriggerChangeEventModule } from '@spryker/utils';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    NzCheckboxModule,
    ApplyAttrsModule,
    TriggerChangeEventModule,
    FormsModule,
  ],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
