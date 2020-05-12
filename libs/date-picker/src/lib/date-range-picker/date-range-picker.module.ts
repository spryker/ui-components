import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DatePickerModule } from '../date-picker.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, DatePickerModule, FormsModule],
  exports: [DateRangePickerComponent],
  declarations: [DateRangePickerComponent],
})
export class DateRangePickerModule {}
