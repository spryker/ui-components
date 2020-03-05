import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IconModule, provideIcons, Icon } from '@spryker/icon';
import suffixIcon from './select/images/icon_dropdown_suffix';
import checkIcon from './select/images/icon_check';
import multiSelectChecked from './select/images/icon_multi_select_checked';
import multiSelectUnChecked from './select/images/icon_multi_select_unchecked';
import removeIcon from './select/images/icon_remove';

const icons: Icon[] = [
  {
    name: 'suffix',
    svg: suffixIcon,
  },
  {
    name: 'check',
    svg: checkIcon,
  },
  {
    name: 'multiSelectChecked',
    svg: multiSelectChecked,
  },
  {
    name: 'multiSelectUnChecked',
    svg: multiSelectUnChecked,
  },
  {
    name: 'remove',
    svg: removeIcon,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, NzSelectModule, IconModule],
  declarations: [SelectComponent],
  exports: [SelectComponent],
  providers: [provideIcons(icons)],
})
export class SelectModule {}
