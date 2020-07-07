import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBatchActionsFeatureComponent } from './table-batch-actions-feature.component';
import { TableFeatureModule, ModuleWithFeature } from '@spryker/table';
import { PluckModule, ApplyContextsModule } from '@spryker/utils';
import { ButtonModule } from '@spryker/button';
import { NotificationModule } from '@spryker/notification';

@NgModule({
  imports: [
    CommonModule,
    TableFeatureModule,
    PluckModule,
    ButtonModule,
    NotificationModule,
    ApplyContextsModule,
  ],
  declarations: [TableBatchActionsFeatureComponent],
  exports: [TableBatchActionsFeatureComponent],
  entryComponents: [TableBatchActionsFeatureComponent],
})
export class TableBatchActionsFeatureModule implements ModuleWithFeature {
  featureComponent = TableBatchActionsFeatureComponent;
}
