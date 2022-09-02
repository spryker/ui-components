import {Meta} from '@storybook/angular';
import {CarouselComponent} from './carousel.component';
import {CarouselModule} from '../carousel.module';

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
        <ng-container *ngFor="let i of ' '.repeat(9).split('')">
            <spy-carousel-slide>
              <img src="https://source.unsplash.com/random/800x450" alt="slide 1">
              <div thumb><img src="https://source.unsplash.com/160x90"  alt="slide 1 thumb"></div>
            </spy-carousel-slide>
        </ng-container>
      </spy-carousel>
    </div>
  `,
});
