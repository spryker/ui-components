import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { AjaxFormModule } from '@spryker/ajax-form';
import { PluckModule } from '@spryker/utils';
import { DrawerModule } from '@spryker/drawer';

@NgModule({
  declarations: [TableFormOverlayActionHandlerComponent],
  imports: [CommonModule, AjaxFormModule, PluckModule, DrawerModule],
  exports: [TableFormOverlayActionHandlerComponent],
})
export class TableFormOverlayActionHandlerModule {}
