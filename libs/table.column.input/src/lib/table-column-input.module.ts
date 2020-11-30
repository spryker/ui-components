import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnInputComponent } from './table-column-input.component';
import { InputModule } from '@spryker/input';
import { ContextModule, InvokeModule } from '@spryker/utils';
import { FormItemModule } from '@spryker/form-item';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ContextModule,
    FormItemModule,
    InvokeModule,
  ],
  declarations: [TableColumnInputComponent],
  exports: [TableColumnInputComponent],
})
export class TableColumnInputModule {}
