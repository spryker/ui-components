import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplyAttrsModule } from '@spryker/utils';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    ApplyAttrsModule,
    NzAutocompleteModule,
  ],
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
})
export class TextareaModule {}
