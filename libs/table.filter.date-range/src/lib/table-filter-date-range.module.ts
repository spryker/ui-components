import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { DateRangePickerModule } from '@spryker/date-picker';
import { I18nModule } from '@spryker/locale';

@NgModule({
  imports: [CommonModule, DateRangePickerModule, I18nModule],
  exports: [TableFilterDateRangeComponent],
  declarations: [TableFilterDateRangeComponent],
})
export class TableFilterDateRangeModule {}
