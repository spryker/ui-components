import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DatePickerModule } from '../date-picker.module';

@NgModule({
    imports: [CommonModule, DatePickerModule],
    exports: [DateRangePickerComponent],
    declarations: [DateRangePickerComponent],
})
export class DateRangePickerModule {}
