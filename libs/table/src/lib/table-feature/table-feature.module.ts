import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableFeatureTplDirective } from './table-feature-tpl.directive';
import { TableFeatureDirective } from './table-feature.directive';

@NgModule({
  imports: [CommonModule],
  exports: [TableFeatureTplDirective, TableFeatureDirective],
  declarations: [TableFeatureTplDirective, TableFeatureDirective],
})
export class TableFeatureModule {}
