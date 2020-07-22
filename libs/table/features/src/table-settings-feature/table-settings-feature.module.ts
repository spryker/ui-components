import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSettingsFeatureComponent } from './table-settings-feature.component';
import { PopoverModule } from '@spryker/popover';
import { CheckboxModule } from '@spryker/checkbox';
import { ButtonToggleModule } from '@spryker/button';
import { IconResetModule, IconSettingsModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';

@NgModule({
  declarations: [TableSettingsFeatureComponent],
  imports: [
    CommonModule,
    IconModule,
    IconSettingsModule,
    IconResetModule,
    PopoverModule,
    CheckboxModule,
    ButtonToggleModule,
    DragDropModule,
    TableFeatureModule,
  ],
  exports: [TableSettingsFeatureComponent],
})
export class TableSettingsFeatureModule implements ModuleWithFeature {
  featureComponent = TableSettingsFeatureComponent;
}
