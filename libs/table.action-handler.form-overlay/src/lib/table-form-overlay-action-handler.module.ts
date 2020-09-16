import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjaxFormModule } from '@spryker/ajax-form';
import { DrawerModule } from '@spryker/drawer';
import { PluckModule } from '@spryker/utils';

import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';

@NgModule({
  imports: [CommonModule, AjaxFormModule, PluckModule, DrawerModule],
  declarations: [TableFormOverlayActionHandlerComponent],
  exports: [TableFormOverlayActionHandlerComponent],
})
export class TableFormOverlayActionHandlerModule {}
