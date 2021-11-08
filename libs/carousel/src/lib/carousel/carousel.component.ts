import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselOptions } from '../types';

import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
import Swiper from 'swiper/core';
import { BehaviorSubject } from 'rxjs';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'spy-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-carousel',
  },
})
export class CarouselComponent {
  constructor() {
    SwiperCore.use([Navigation, Thumbs]);
  }

  @Input() config: CarouselOptions = { slidesPerView: 1 };
  @Input() thumbConfig: CarouselOptions = {
    slidesPerView: 6,
    spaceBetween: 15,
  };
  @Input() withThumbs = false;

  @ViewChild('mainSwiper', { static: false }) swiper!: SwiperComponent;

  thumbsSwiper: Swiper | undefined;

  paginationArrowIcon = IconPaginationArrowModule.icon;

  slides$ = new BehaviorSubject<CarouselSlideComponent[]>([]);

  @ContentChildren(CarouselSlideComponent)
  set contentSlides(slides: QueryList<CarouselSlideComponent>) {
    this.slides$.next(slides.toArray());
  }

  slideNext() {
    this.swiper.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev();
  }
}
