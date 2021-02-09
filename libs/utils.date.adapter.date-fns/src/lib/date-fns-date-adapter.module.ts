import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateModule } from '@spryker/utils/date';

import { DateFnsDateAdapterService } from './date-fns-date-adapter.service';

@NgModule({
  imports: [CommonModule, DateModule.withAdapter(DateFnsDateAdapterService)],
})
export class DateFnsDateAdapterModule {}
