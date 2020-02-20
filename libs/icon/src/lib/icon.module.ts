import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [CommonModule, NzIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
