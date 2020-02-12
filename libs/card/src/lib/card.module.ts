import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, NzCardModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
