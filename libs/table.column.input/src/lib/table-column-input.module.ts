import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnInputComponent } from './table-column-input.component';
import { InputModule } from '@spryker/input';
import { ContextModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, InputModule, ContextModule],
  declarations: [TableColumnInputComponent],
  exports: [TableColumnInputComponent],
})
export class TableColumnInputModule {}
