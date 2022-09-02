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

  constructor(private cdr: ChangeDetectorRef) {
    SwiperCore.use([Navigation, Thumbs]);
  }

  @Input() config: CarouselOptions = { slidesPerView: 1 };
  @Input() withThumbs = false;

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
    this.thumbSwiper.swiperRef.slideNext();
  }

  slidePrev() {
    this.thumbSwiper.swiperRef.slidePrev();
  }

  ngAfterViewInit() {
    if (this.thumbSwiper.swiperRef.slides.length <= 6) {
      this.hideNext = true;
      this.hidePrev = true;
      return;
    }
    const slideHandler = () => {
      this.hidePrev = this.thumbSwiper.swiperRef.isBeginning;
      this.hideNext = this.thumbSwiper.swiperRef.isEnd;
      this.cdr.detectChanges();
    };
    this.thumbSwiper.swiperRef.on('slideChange', slideHandler);
    this.thumbSwiper.swiperRef.on('reachBeginning', slideHandler);
    this.thumbSwiper.swiperRef.on('reachEnd', slideHandler);
  }
}
