import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxFormComponent } from './ajax-form/ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';

@NgModule({
    imports: [CommonModule, StaticHtmlRendererModule, NzSpinModule, UnsavedChangesFormMonitorModule],
    declarations: [AjaxFormComponent],
    exports: [AjaxFormComponent],
})
export class AjaxFormModule {}
