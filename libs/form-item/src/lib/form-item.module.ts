import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MessageTypePipe } from './form-item/message-type.pipe';
import { FormItemComponent } from './form-item/form-item.component';

@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    BrowserAnimationsModule,
  ],
  declarations: [FormItemComponent, MessageTypePipe],
  exports: [FormItemComponent],
})
export class FormItemModule {}
