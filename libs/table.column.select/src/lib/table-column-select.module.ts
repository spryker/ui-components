import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnSelectComponent } from './table-column-select.component';
import { ContextModule } from '@spryker/utils';
import { SelectModule } from '@spryker/select';

@NgModule({
  imports: [CommonModule, ContextModule, SelectModule],
  declarations: [TableColumnSelectComponent],
  exports: [TableColumnSelectComponent],
})
export class TableColumnSelectModule {}
