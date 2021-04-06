import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
