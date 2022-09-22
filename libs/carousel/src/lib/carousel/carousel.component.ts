import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselOptions } from '../types';

import SwiperCore from 'swiper/core';
import Swiper, { Navigation, Thumbs } from 'swiper/core';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
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
export class CarouselComponent implements AfterViewInit {
  hidePrev = true;
  hideNext = false;

  @Input() withoutNavSlidesAmount = 5;
  @Input() config: CarouselOptions = { slidesPerView: 'auto' };
  @Input() thumbConfig: CarouselOptions = {
    slidesPerView: 'auto',
    spaceBetween: 10,
  };
  @Input() withThumbs = false;
  @Input() slidesPerClick = 2;

  constructor(private cdr: ChangeDetectorRef) {
    SwiperCore.use([Navigation, Thumbs]);
  }

  @ViewChild('mainSwiper', { static: false }) swiper!: SwiperComponent;
  @ViewChild('thumbSwiper', { static: false }) thumbSwiper!: SwiperComponent;

  thumbsSwiper: Swiper | undefined;

  paginationArrowIcon = IconPaginationArrowModule.icon;

  slides$ = new BehaviorSubject<CarouselSlideComponent[]>([]);

  @ContentChildren(CarouselSlideComponent)
  set contentSlides(slides: QueryList<CarouselSlideComponent>) {
    this.slides$.next(slides.toArray());
  }

  slideNext() {
    this.thumbSwiper.swiperRef.slideTo(
      this.thumbSwiper.swiperRef.activeIndex + this.slidesPerClick,
    );
  }

  slidePrev() {
    this.thumbSwiper.swiperRef.slideTo(
      this.thumbSwiper.swiperRef.activeIndex - this.slidesPerClick,
    );
  }

  slideHandler(thumbSwiper: Swiper) {
    this.hidePrev = thumbSwiper.isBeginning;
    this.hideNext = thumbSwiper.isEnd;
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    if (this.slides$.value.length <= this.withoutNavSlidesAmount) {
      this.hideNext = true;
      this.hidePrev = true;
      this.cdr.detectChanges();
    }
  }
}
