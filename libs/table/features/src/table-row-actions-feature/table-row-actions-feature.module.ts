import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';
import { DropdownModule } from '@spryker/dropdown';
import { IconActionModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';
import { FilterAvailableActions } from './table-row-actions-feature.pipe';

import { TableRowActionsFeatureComponent } from './table-row-actions-feature.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    IconActionModule,
    IconModule,
    TableFeatureModule,
  ],
  exports: [TableRowActionsFeatureComponent],
  declarations: [TableRowActionsFeatureComponent, FilterAvailableActions],
  entryComponents: [TableRowActionsFeatureComponent],
})
export class TableRowActionsFeatureModule implements ModuleWithFeature {
  featureComponent = TableRowActionsFeatureComponent;
}
