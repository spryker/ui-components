import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxFormComponent } from './ajax-form/ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    CommonModule,
    StaticHtmlRendererModule,
    NzSpinModule,
  ],
  declarations: [AjaxFormComponent],
  exports: [AjaxFormComponent],
})
export class AjaxFormModule {}
