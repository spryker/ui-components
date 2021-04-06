import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';

import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';

SwiperCore.use([Thumbs, Navigation]);

@Component({
  selector: 'spy-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  slides$ = new BehaviorSubject(new Set<CarouselSlideComponent>());
  mainSlides$ = this.slides$.pipe(
    map((sildes) => [...sildes].filter((slide) => !slide.isThumb)),
  );
  thumbSlides$ = this.slides$.pipe(
    map((sildes) => [...sildes].filter((slide) => slide.isThumb)),
  );

  thumbsSwiper?: SwiperComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  setThumbsSwiper(swiper: SwiperComponent) {
    this.thumbsSwiper = swiper;
  }

  registerSlide(component: CarouselSlideComponent) {
    const slides = this.slides$.getValue();

    if (slides.has(component)) {
      return;
    }

    slides.add(component);
    this.slides$.next(slides);
    this.cdr.detectChanges();
  }

  unregisterRadio(component: CarouselSlideComponent) {
    const slides = this.slides$.getValue();

    if (!slides.has(component)) {
      return;
    }

    slides.add(component);
    this.slides$.next(slides);
    this.cdr.detectChanges();
  }
}
