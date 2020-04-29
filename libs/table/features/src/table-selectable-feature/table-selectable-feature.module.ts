import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from '@spryker/checkbox';
import { TableFeatureModule, ModuleWithFeature } from '@spryker/table';

import { TableSelectableFeatureComponent } from './table-selectable-feature.component';

@NgModule({
  imports: [CommonModule, CheckboxModule, TableFeatureModule],
  exports: [TableSelectableFeatureComponent],
  declarations: [TableSelectableFeatureComponent],
  entryComponents: [TableSelectableFeatureComponent],
})
export class TableSelectableFeatureModule implements ModuleWithFeature {
  featureComponent = TableSelectableFeatureComponent;
}
