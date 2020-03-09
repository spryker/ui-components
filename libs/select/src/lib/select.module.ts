import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon, IconModule, provideIcons } from '@spryker/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { multiSelectChecked, multiSelectUnChecked } from './select/images';
import { SelectComponent } from './select/select.component';

const icons: Icon[] = [
  {
    name: 'multiSelectChecked',
    svg: multiSelectChecked,
  },
  {
    name: 'multiSelectUnChecked',
    svg: multiSelectUnChecked,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, NzSelectModule, IconModule],
  declarations: [SelectComponent],
  exports: [SelectComponent],
  providers: [provideIcons(icons)],
})
export class SelectModule {}
