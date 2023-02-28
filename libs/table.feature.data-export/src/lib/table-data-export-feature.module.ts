import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';
import { ButtonActionModule } from '@spryker/button.action';
import { TableDataExportFeatureComponent } from './table-data-export-feature.component';

@NgModule({
    imports: [CommonModule, TableFeatureModule, ButtonActionModule],
    declarations: [TableDataExportFeatureComponent],
    exports: [TableDataExportFeatureComponent],
})
export class TableDataExportFeatureModule implements ModuleWithFeature {
    featureComponent = TableDataExportFeatureComponent;
}
