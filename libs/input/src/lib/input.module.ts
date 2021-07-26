import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplyAttrsModule } from '@spryker/utils';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ApplyAttrsModule,
    FormsModule,
    NzAutocompleteModule,
    CustomElementBoundaryModule,
  ],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
