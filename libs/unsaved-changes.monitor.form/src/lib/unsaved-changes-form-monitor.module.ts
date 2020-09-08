import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsavedChangesFormMonitorDirective } from './unsaved-changes-form-monitor.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [UnsavedChangesFormMonitorDirective],
  exports: [UnsavedChangesFormMonitorDirective],
})
export class UnsavedChangesFormMonitorModule {}
