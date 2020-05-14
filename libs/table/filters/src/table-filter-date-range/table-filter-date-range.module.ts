import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { DateRangePickerModule } from '@spryker/date-picker';

@NgModule({
  imports: [CommonModule, DateRangePickerModule],
  exports: [TableFilterDateRangeComponent],
  declarations: [TableFilterDateRangeComponent],
})
export class TableFilterDateRangeModule {}
