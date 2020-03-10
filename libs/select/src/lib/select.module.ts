import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon, IconModule, provideIcons } from '@spryker/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import {
  iconCheck,
  iconChecked,
  iconSuffix,
  iconUnChecked,
  removeIcon,
} from './icons';
import { SelectComponent } from './select/select.component';

const icons: Icon[] = [
  { name: 'suffix', svg: iconSuffix },
  { name: 'check', svg: iconCheck },
  { name: 'remove', svg: removeIcon },
  { name: 'multiSelectChecked', svg: iconChecked },
  { name: 'multiSelectUnChecked', svg: iconUnChecked },
];

@NgModule({
  imports: [CommonModule, FormsModule, NzSelectModule, IconModule],
  declarations: [SelectComponent],
  exports: [SelectComponent],
  providers: [provideIcons(icons)],
})
export class SelectModule {}
