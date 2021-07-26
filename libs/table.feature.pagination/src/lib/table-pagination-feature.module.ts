import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithFeature, TableFeatureModule } from '@spryker/table';
import { PaginationModule } from '@spryker/pagination';
import { PluckModule } from '@spryker/utils';

import { TablePaginationFeatureComponent } from './table-pagination-feature.component';

@NgModule({
  imports: [CommonModule, PaginationModule, TableFeatureModule, PluckModule],
  exports: [TablePaginationFeatureComponent],
  declarations: [TablePaginationFeatureComponent],
  entryComponents: [TablePaginationFeatureComponent],
})
export class TablePaginationFeatureModule implements ModuleWithFeature {
  featureComponent = TablePaginationFeatureComponent;
}
