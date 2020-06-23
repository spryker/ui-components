import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spryker/icon';
import { IconCalendarModule } from '@spryker/icon/icons';
import { LocaleModule } from '@spryker/locale';
import { ToIsoFormatModule } from '@spryker/utils';

@NgModule({
  imports: [
    CommonModule,
    NzDatePickerModule,
    FormsModule,
    IconModule,
    IconCalendarModule,
    LocaleModule,
    ToIsoFormatModule,
  ],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}
