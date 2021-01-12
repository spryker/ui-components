import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, NzInputModule, ApplyAttrsModule],
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
})
export class TextareaModule {}
