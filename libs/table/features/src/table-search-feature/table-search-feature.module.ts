import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSearchFeatureComponent } from './table-search-feature.component';
import { InputModule } from '@spryker/input';
import { IconModule } from '@spryker/icon';
import { IconMagnifierModule } from '@spryker/icon/icons';

@NgModule({
  imports: [CommonModule, IconModule, InputModule, IconMagnifierModule],
  exports: [TableSearchFeatureComponent],
  declarations: [TableSearchFeatureComponent],
})
export class TableSearchFeatureModule {}
