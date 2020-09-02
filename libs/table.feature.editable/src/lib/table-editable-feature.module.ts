import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@spryker/button';
import { IconModule } from '@spryker/icon';
import {
  IconActionModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { PopoverModule } from '@spryker/popover';
import { ModuleWithFeature, TableModule } from '@spryker/table';
import { InvokeModule } from '@spryker/utils';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

@NgModule({
  imports: [
    CommonModule,
    InvokeModule,
    IconModule,
    IconCheckModule,
    IconActionModule,
    IconRemoveModule,
    ButtonModule,
    PopoverModule,
    TableModule,
  ],
  exports: [TableEditableFeatureComponent],
  declarations: [TableEditableFeatureComponent],
  entryComponents: [TableEditableFeatureComponent],
})
export class TableEditableFeatureModule implements ModuleWithFeature {
  featureComponent = TableEditableFeatureComponent;
}
