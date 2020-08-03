import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlRendererComponent } from './html-renderer.component';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [CommonModule, CustomElementBoundaryModule, NzSpinModule],
  declarations: [HtmlRendererComponent],
  exports: [HtmlRendererComponent],
})
export class HtmlRendererComponentModule {}
