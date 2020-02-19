import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { IconService } from './icon/icon.component.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzIconModule],
  declarations: [IconComponent],
  providers: [IconService],
  exports: [IconComponent],
})
export class IconModule {}
