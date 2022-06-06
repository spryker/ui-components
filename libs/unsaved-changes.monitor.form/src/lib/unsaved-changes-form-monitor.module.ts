import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsavedChangesFormMonitorDirective } from './unsaved-changes-form-monitor.directive';
import { UnsavedChangesFormMonitorBubblingDirective } from './unsaved-changes-form-monitor-bubbling.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [UnsavedChangesFormMonitorDirective, UnsavedChangesFormMonitorBubblingDirective],
    exports: [UnsavedChangesFormMonitorDirective, UnsavedChangesFormMonitorBubblingDirective],
})
export class UnsavedChangesFormMonitorModule {}
