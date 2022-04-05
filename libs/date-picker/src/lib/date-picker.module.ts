import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spryker/icon';
import { IconCalendarModule } from '@spryker/icon/icons';
import { LocaleModule } from '@spryker/locale';
import { ToIsoDateFormatModule } from '@spryker/utils';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    NzDatePickerModule,
    FormsModule,
    IconModule,
    IconCalendarModule,
    LocaleModule,
    ToIsoDateFormatModule,
  ],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}
