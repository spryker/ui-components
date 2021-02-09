import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InjectableType } from '@spryker/utils';

import { provideDateAdapter } from './token';
import { DateAdapter } from './types';

@NgModule({
  imports: [CommonModule],
})
export class DateModule {
  static withAdapter(
    adapter: InjectableType<DateAdapter>,
  ): ModuleWithProviders<DateModule> {
    return {
      ngModule: DateModule,
      providers: [provideDateAdapter(adapter)],
    };
  }
}
