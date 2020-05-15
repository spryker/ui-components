import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';

import { TableTotalFeatureComponent } from './table-total-feature.component';

@NgModule({
  imports: [CommonModule, TableFeatureModule],
  exports: [TableTotalFeatureComponent],
  declarations: [TableTotalFeatureComponent],
  entryComponents: [TableTotalFeatureComponent],
})
export class TableTotalFeatureModule implements ModuleWithFeature {
  featureComponent = TableTotalFeatureComponent;
}
