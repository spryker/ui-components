import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterSelectComponent } from './table-filter-select.component';
import { SelectModule } from '@spryker/select';

@NgModule({
  imports: [CommonModule, SelectModule],
  declarations: [TableFilterSelectComponent],
  exports: [TableFilterSelectComponent],
})
export class TableFilterSelectModule {}
