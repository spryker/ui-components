import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlRendererComponent } from './html-renderer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HtmlRendererComponent],
  exports: [HtmlRendererComponent],
})
export class HtmlRendererComponentModule {}
