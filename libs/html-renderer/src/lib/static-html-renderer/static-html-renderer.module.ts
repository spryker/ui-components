import { NgModule } from '@angular/core';
import { HtmlRendererComponentModule } from '../html-renderer/html-renderer.module';
import { StaticHtmlRendererDirective } from './static-html-renderer.directive';

@NgModule({
    imports: [HtmlRendererComponentModule],
    declarations: [StaticHtmlRendererDirective],
    exports: [HtmlRendererComponentModule, StaticHtmlRendererDirective],
})
export class StaticHtmlRendererModule {}
