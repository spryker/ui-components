import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSettingsFeatureComponent } from './table-settings-feature.component';
import { PopoverModule } from '@spryker/popover';
import { CheckboxModule } from '@spryker/checkbox';
import { ButtonToggleModule } from '@spryker/button';
import { IconResetModule, IconSettingsModule, IconDragModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';
import { I18nModule } from '@spryker/locale';

@NgModule({
    declarations: [TableSettingsFeatureComponent],
    imports: [
        CommonModule,
        IconModule,
        IconSettingsModule,
        IconResetModule,
        IconDragModule,
        PopoverModule,
        CheckboxModule,
        ButtonToggleModule,
        DragDropModule,
        TableFeatureModule,
        I18nModule,
    ],
    exports: [TableSettingsFeatureComponent],
})
export class TableSettingsFeatureModule implements ModuleWithFeature {
    featureComponent = TableSettingsFeatureComponent;
}
