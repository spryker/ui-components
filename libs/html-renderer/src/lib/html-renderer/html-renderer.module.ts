import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlRendererComponent } from './html-renderer.component';
import { CustomElementBoundaryModule } from '@spryker/web-components';
@NgModule({
  imports: [CommonModule, CustomElementBoundaryModule],
  declarations: [HtmlRendererComponent],
  exports: [HtmlRendererComponent],
})
export class HtmlRendererComponentModule {}
