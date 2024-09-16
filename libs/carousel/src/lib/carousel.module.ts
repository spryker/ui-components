import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
    imports: [CommonModule, IconModule, IconPaginationArrowModule],
    declarations: [CarouselComponent, CarouselSlideComponent],
    exports: [CarouselComponent, CarouselSlideComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselModule {}
