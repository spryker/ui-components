import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import SwiperCore, { Thumbs, Navigation } from 'swiper/core';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Thumbs, Navigation]);

@Component({
  selector: 'spy-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  thumbsSwiper?: SwiperComponent;
  setThumbsSwiper(swiper: SwiperComponent) {
    this.thumbsSwiper = swiper;
  }
}
