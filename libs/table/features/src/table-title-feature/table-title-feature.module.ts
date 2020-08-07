import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTitleFeatureComponent } from './table-title-feature.component';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';

@NgModule({
  declarations: [TableTitleFeatureComponent],
  imports: [CommonModule, TableFeatureModule],
  exports: [TableTitleFeatureComponent],
  entryComponents: [TableTitleFeatureComponent],
})
export class TableTitleFeatureModule implements ModuleWithFeature {
  featureComponent = TableTitleFeatureComponent;
}
