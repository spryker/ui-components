import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';
import { PluckModule } from '@spryker/utils';
import { I18nModule } from '@spryker/locale';
import { TableTotalFeatureComponent } from './table-total-feature.component';

@NgModule({
  imports: [CommonModule, TableFeatureModule, PluckModule, I18nModule],
  exports: [TableTotalFeatureComponent],
  declarations: [TableTotalFeatureComponent],
  entryComponents: [TableTotalFeatureComponent],
})
export class TableTotalFeatureModule implements ModuleWithFeature {
  featureComponent = TableTotalFeatureComponent;
}
