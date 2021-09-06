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
    <div style="width: 800px">
      <spy-carousel slidesPerView="2" withThumbs="true">
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450">
          <div thumb><img src="https://source.unsplash.com/160x90"></div>
        </spy-carousel-slide>
      </spy-carousel>
    </div>
  `,
  props: {},
});
