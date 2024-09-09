import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { SwiperModule } from 'swiper/angular';
import { IconModule } from '@spryker/icon';
import { IconPaginationArrowModule } from '@spryker/icon/icons';

@NgModule({
    imports: [CommonModule, SwiperModule, IconModule, IconPaginationArrowModule],
    declarations: [CarouselComponent, CarouselSlideComponent],
    exports: [CarouselComponent, CarouselSlideComponent],
})
export class CarouselModule {}
