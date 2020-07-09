import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzCardModule } from 'ng-zorro-antd/card';

import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, NzCardModule, CustomElementBoundaryModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
