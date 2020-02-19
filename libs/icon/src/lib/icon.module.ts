import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
