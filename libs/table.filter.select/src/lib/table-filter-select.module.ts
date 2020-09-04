import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterSelectComponent } from './table-filter-select.component';
import { SelectModule } from '@spryker/select';
import { I18nModule } from '@spryker/locale';

@NgModule({
  imports: [CommonModule, SelectModule, I18nModule],
  declarations: [TableFilterSelectComponent],
  exports: [TableFilterSelectComponent],
})
export class TableFilterSelectModule {}
