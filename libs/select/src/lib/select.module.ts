import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IconModule, provideIcons, Icon } from '@spryker/icon';
import {
  suffixIcon,
  checkIcon,
  multiSelectChecked,
  multiSelectUnChecked,
  removeIcon,
} from './select/images';

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
