import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from '@spryker/checkbox';

import { TableSelectableFeatureComponent } from './table-selectable-feature.component';

@NgModule({
  imports: [CommonModule, CheckboxModule],
  exports: [TableSelectableFeatureComponent],
  declarations: [TableSelectableFeatureComponent],
})
export class TableSelectableFeatureModule {}
