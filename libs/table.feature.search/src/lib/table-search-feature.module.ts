import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@spryker/input';
import { IconModule } from '@spryker/icon';
import { IconMagnifierModule, IconRemoveModule } from '@spryker/icon/icons';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';

import { TableSearchFeatureComponent } from './table-search-feature.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    IconMagnifierModule,
    IconRemoveModule,
    InputModule,
    TableFeatureModule,
  ],
  exports: [TableSearchFeatureComponent],
  declarations: [TableSearchFeatureComponent],
})
export class TableSearchFeatureModule implements ModuleWithFeature {
  featureComponent = TableSearchFeatureComponent;
}
