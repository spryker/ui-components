import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from '@spryker/table';

import { TableTotalFeatureComponent } from './table-total-feature.component';

@NgModule({
  imports: [CommonModule, TableModule],
  exports: [TableTotalFeatureComponent],
  declarations: [TableTotalFeatureComponent],
})
export class TableTotalFeatureModule {}
