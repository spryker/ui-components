import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxFormComponent } from './ajax-form/ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, StaticHtmlRendererModule, HttpClientModule],
  declarations: [AjaxFormComponent],
  exports: [AjaxFormComponent],
})
export class AjaxFormModule {}
