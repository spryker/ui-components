import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {CarouselOptions} from '../types';

import SwiperCore from 'swiper/core';
import Swiper, {Navigation, Thumbs} from 'swiper/core';
import {IconPaginationArrowModule} from '@spryker/icon/icons';
import {BehaviorSubject} from 'rxjs';
import {CarouselSlideComponent} from '../carousel-slide/carousel-slide.component';
import {SwiperComponent} from 'swiper/angular';

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
  firstSlide = true;
  lastSlide = false;

  constructor(private cdr: ChangeDetectorRef) {
    SwiperCore.use([Navigation, Thumbs]);
  }

  @Input() config: CarouselOptions = {slidesPerView: 1};
  @Input() thumbConfig: CarouselOptions = {
    slidesPerView: 6,
    spaceBetween: 15,
  };
  @Input() withThumbs = false;

  @ViewChild('mainSwiper', {static: false}) swiper!: SwiperComponent;

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

  ngAfterViewInit() {
    this.swiper.swiperRef.on('activeIndexChange', () => {
      this.firstSlide = this.swiper.swiperRef.isBeginning;
      this.lastSlide = this.swiper.swiperRef.isEnd;
      this.cdr.detectChanges();
    })
  }
}
