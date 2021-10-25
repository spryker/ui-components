import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spryker/icon';
import { IconStarModule } from '@spryker/icon/icons';

@NgModule({
  imports: [
    CommonModule,
    NzRateModule,
    FormsModule,
    IconModule,
    IconStarModule,
  ],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class RatingModule {}
