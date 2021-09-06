import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselOptions } from '../types';

import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import { NavigationOptions } from 'swiper/types';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
import Swiper from 'swiper/core';
import { BehaviorSubject } from 'rxjs';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';

SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'spy-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  @Input() config?: CarouselOptions = { slidesPerView: 1 };
  @Input() thumbConfig?: CarouselOptions = {
    slidesPerView: 4,
    spaceBetween: 15,
  };
  @Input() withThumbs = false;

  navigationOptions: NavigationOptions = {
    prevEl: '.carousel-navigation-button_preview',
    nextEl: '.carousel-navigation-button_next',
  };

  paginationArrowIcon = IconPaginationArrowModule.icon;

  thumbsSwiper: Swiper | undefined;

  slides$ = new BehaviorSubject<CarouselSlideComponent[]>([]);

  @ContentChildren(CarouselSlideComponent)
  set contentSlides(slides: QueryList<CarouselSlideComponent>) {
    this.slides$.next(slides.toArray());
  }

  constructor() {}

  ngOnInit(): void {}
}
