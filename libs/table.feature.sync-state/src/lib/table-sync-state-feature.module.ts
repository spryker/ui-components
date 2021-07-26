import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';

import { TableSyncStateFeatureComponent } from './table-sync-state-feature.component';

@NgModule({
  imports: [CommonModule, TableFeatureModule],
  exports: [TableSyncStateFeatureComponent],
  declarations: [TableSyncStateFeatureComponent],
  entryComponents: [TableSyncStateFeatureComponent],
})
export class TableSyncStateFeatureModule implements ModuleWithFeature {
  featureComponent = TableSyncStateFeatureComponent;
}
