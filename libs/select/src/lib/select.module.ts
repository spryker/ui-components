import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import suffixIcon from './select/images/icon_dropdown_suffix';
import checkIcon from './select/images/icon_check';
import multiSelectChecked from './select/images/icon_multi_select_checked';
import multiSelectUnChecked from './select/images/icon_multi_select_unchecked';
import removeIcon from './select/images/icon_remove';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    BrowserAnimationsModule,
    IconModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'suffix',
        svg: suffixIcon,
      },
      multi: true,
    },
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'check',
        svg: checkIcon,
      },
      multi: true,
    },
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'multiSelectChecked',
        svg: multiSelectChecked,
      },
      multi: true,
    },
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'multiSelectUnChecked',
        svg: multiSelectUnChecked,
      },
      multi: true,
    },
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'remove',
        svg: removeIcon,
      },
      multi: true,
    },
  ],
})
export class SelectModule {}
