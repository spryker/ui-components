import { NgModule } from '@angular/core';
import { HtmlRendererComponentModule } from '../html-renderer/html-renderer.module';
import { UrlHtmlRendererDirective } from './url-html-renderer.directive';

@NgModule({
  imports: [HtmlRendererComponentModule],
  declarations: [UrlHtmlRendererDirective],
  exports: [HtmlRendererComponentModule, UrlHtmlRendererDirective],
})
export class UrlHtmlRendererModule {}
