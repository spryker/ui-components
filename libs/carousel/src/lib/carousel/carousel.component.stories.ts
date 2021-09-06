import { CarouselComponent } from './carousel.component';
import { SwiperModule } from 'swiper/angular';
import { IconModule } from '@spryker/icon';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
import { CarouselModule } from '../carousel.module';

export default {
  title: 'CarouselComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      CarouselModule,
      SwiperModule,
      IconModule,
      IconPaginationArrowModule,
    ],
  },
  template: `
    <spy-carousel slidesPerView="2" withThumbs="true">
      <spy-carousel-slide>
        Slide 1
        <div thumb>slide 1</div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 2
        <div thumb>slide 2</div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 3
        <div thumb>slide 3</div>
      </spy-carousel-slide>
    </spy-carousel>
  `,
  props: {},
});
