import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from '@spryker/checkbox';
import { TableModule } from '@spryker/table';

import { TableSelectableFeatureComponent } from './table-selectable-feature.component';

@NgModule({
  imports: [CommonModule, CheckboxModule, TableModule],
  exports: [TableSelectableFeatureComponent],
  declarations: [TableSelectableFeatureComponent],
})
export class TableSelectableFeatureModule {}
