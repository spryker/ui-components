import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToIsoDateFormatPipe } from './to-iso-date-format.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ToIsoDateFormatPipe],
    exports: [ToIsoDateFormatPipe],
})
export class ToIsoDateFormatModule {}
