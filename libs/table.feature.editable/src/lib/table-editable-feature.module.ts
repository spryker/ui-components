import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@spryker/button';
import { IconModule } from '@spryker/icon';
import {
  IconEditModule,
  IconWarningModule,
  IconPlusModule,
} from '@spryker/icon/icons';
import { ModuleWithFeature, TableModule } from '@spryker/table';
import { InvokeModule } from '@spryker/utils';
import { I18nModule } from '@spryker/locale';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

@NgModule({
  imports: [
    CommonModule,
    InvokeModule,
    IconModule,
    IconEditModule,
    ButtonModule,
    TableModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
    IconWarningModule,
    I18nModule,
    IconPlusModule,
  ],
  exports: [TableEditableFeatureComponent],
  declarations: [TableEditableFeatureComponent],
  entryComponents: [TableEditableFeatureComponent],
})
export class TableEditableFeatureModule implements ModuleWithFeature {
  featureComponent = TableEditableFeatureComponent;
}
