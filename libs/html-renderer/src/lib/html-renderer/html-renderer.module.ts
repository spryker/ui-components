import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@spryker/spinner';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { HtmlRendererComponent } from './html-renderer.component';

@NgModule({
  imports: [CommonModule, CustomElementBoundaryModule, SpinnerModule],
  declarations: [HtmlRendererComponent],
  exports: [HtmlRendererComponent],
})
export class HtmlRendererComponentModule {}
