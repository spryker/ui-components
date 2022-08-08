import { Meta } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';
import { CarouselModule } from '../carousel.module';

export default {
  title: 'CarouselComponent',
  parameters: {
    controls: {
      include: [
        'slidesPerView',
        'slidesSpaceBetween',
        'withThumbs',
        'thumbsPerView',
        'thumbsSpaceBetween',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2201%3A6727',
      allowFullscreen: true,
    },
  },
  args: {
    slidesPerView: 1,
    slidesSpaceBetween: 15,
    withThumbs: true,
    thumbsPerView: 6,
    thumbsSpaceBetween: 15,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [CarouselModule],
  },
  template: `
    <div style="width: 800px">
      <spy-carousel
        [config]="{
          slidesPerView: slidesPerView,
          spaceBetween: slidesSpaceBetween
        }"
        [thumbConfig]="{
          slidesPerView: thumbsPerView,
          spaceBetween: thumbsSpaceBetween
        }"
        [withThumbs]="withThumbs"
      >
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450" alt="slide 1">
          <div thumb><img src="https://source.unsplash.com/160x90"  alt="slide 1 thumb"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450" alt="slide 2">
          <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 2 thumb"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <iframe width="800" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <div thumb><img src="https://source.unsplash.com/niUkImZcSP8/160x90" alt="slide 3 thumb"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450" alt="slide 4">
          <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 4 thumb"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450" alt="slide 5">
          <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 5 thumb"></div>
        </spy-carousel-slide>
        <spy-carousel-slide>
          <img src="https://source.unsplash.com/random/800x450" alt="slide 6">
          <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 6 thumb"></div>
        </spy-carousel-slide>
      </spy-carousel>
    </div>
  `,
});
