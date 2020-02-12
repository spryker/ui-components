import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { OfTypePipe } from '@spryker-ui/utils';
import { FormItemComponent } from './form-item/form-item.component';

@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    BrowserAnimationsModule,
  ],
  declarations: [FormItemComponent, OfTypePipe],
  exports: [FormItemComponent],
})
export class FormItemModule {}
