import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplyAttrsModule } from '@spryker/utils';
import { FormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { SelectComponentsModule } from '@spryker/web-components';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ApplyAttrsModule,
    FormsModule,
    NzAutocompleteModule,
    SelectComponentsModule,
  ],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
