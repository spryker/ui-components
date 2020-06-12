import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { AjaxFormModule } from '@spryker/ajax-form';
import { PluckModule } from '@spryker/utils';

@NgModule({
  declarations: [TableFormOverlayActionHandlerComponent],
  imports: [CommonModule, AjaxFormModule, PluckModule],
  exports: [TableFormOverlayActionHandlerComponent],
})
export class TableFormOverlayActionHandlerModule {}
