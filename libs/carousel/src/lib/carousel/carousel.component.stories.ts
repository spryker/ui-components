import { CarouselComponent } from './carousel.component';
import { CarouselModule } from '../carousel.module';
import { boolean, number } from '@storybook/addon-knobs';

export default {
  title: 'CarouselComponent',
};

export const primary = () => ({
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
  props: {
    slidesPerView: number('Slides per view', 1),
    slidesSpaceBetween: number('Slides space between', 15),
    withThumbs: boolean('With thumbs', true),
    thumbsPerView: number('Thumbs per view', 6),
    thumbsSpaceBetween: number('Thumbs space between', 15),
  },
});
