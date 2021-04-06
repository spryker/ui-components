import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SwiperModule } from 'swiper/angular';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [CarouselComponent, CarouselSlideComponent],
  exports: [CarouselComponent, CarouselSlideComponent],
})
export class CarouselModule {}
