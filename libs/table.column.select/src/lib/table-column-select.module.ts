import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnSelectComponent } from './table-column-select.component';
import { ContextModule } from '@spryker/utils';
import { SelectModule } from '@spryker/select';
import { FormItemModule } from '@spryker/form-item';

@NgModule({
  imports: [CommonModule, ContextModule, SelectModule, FormItemModule],
  declarations: [TableColumnSelectComponent],
  exports: [TableColumnSelectComponent],
})
export class TableColumnSelectModule {}
