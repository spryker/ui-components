import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxFormComponent } from './ajax-form/ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { HttpClientModule } from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IconModule } from '@spryker/icon';

@NgModule({
  imports: [
    CommonModule,
    StaticHtmlRendererModule,
    HttpClientModule,
    NzSpinModule,
    IconModule,
  ],
  declarations: [AjaxFormComponent],
  exports: [AjaxFormComponent],
})
export class AjaxFormModule {}
