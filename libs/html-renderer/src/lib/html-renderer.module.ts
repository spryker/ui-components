import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlRendererComponent } from './html-renderer/html-renderer.component';
import { StaticHtmlRendererDirective } from './html-renderer/static.html-renderer.directive';
import { UrlHtmlRendererDirective } from './html-renderer/url.html-renderer.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HtmlRendererComponent,
    StaticHtmlRendererDirective,
    UrlHtmlRendererDirective,
  ],
  exports: [
    HtmlRendererComponent,
    StaticHtmlRendererDirective,
    UrlHtmlRendererDirective,
  ],
})
export class HtmlRendererModule {}
