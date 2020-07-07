import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHtmlOverlayActionHandlerComponent } from './table-html-overlay-action-handler.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { DrawerModule } from '@spryker/drawer';

@NgModule({
  imports: [CommonModule, StaticHtmlRendererModule, DrawerModule],
  exports: [TableHtmlOverlayActionHandlerComponent],
  declarations: [TableHtmlOverlayActionHandlerComponent],
})
export class TableHtmlOverlayActionHandlerModule {}
