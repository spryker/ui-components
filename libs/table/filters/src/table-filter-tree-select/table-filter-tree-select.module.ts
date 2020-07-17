import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterTreeSelectComponent } from './table-filter-tree-select.component';
import { I18nModule } from '@spryker/locale';
import { TreeSelectModule } from '@spryker/tree-select';

@NgModule({
  imports: [CommonModule, TreeSelectModule, I18nModule],
  exports: [TableFilterTreeSelectComponent],
  declarations: [TableFilterTreeSelectComponent],
})
export class TableFilterTreeSelectModule {}
