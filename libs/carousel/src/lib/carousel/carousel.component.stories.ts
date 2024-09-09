import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { CarouselModule } from '../carousel.module';

export default {
    title: 'CarouselComponent',
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [CarouselModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['slidesPerView', 'slidesSpaceBetween', 'withThumbs', 'thumbsPerView', 'thumbsSpaceBetween'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2201%3A6727',
            allowFullscreen: true,
        },
    },
    args: {
        withThumbs: true,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <div style="width: 100%">
      <spy-carousel
        [withThumbs]="withThumbs"
      >
        <ng-container *ngFor="let _ of ' '.repeat(5).split(''); let i = index;">
            <spy-carousel-slide>
              <img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}}">
              <div thumb><img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}} thumb"></div>
            </spy-carousel-slide>
        </ng-container>
      </spy-carousel>
    </div>
  `,
});

export const withNavigation = (args) => ({
    props: args,
    template: `
    <div style="width: 100%">
      <spy-carousel
        [withThumbs]="withThumbs"
      >
        <ng-container *ngFor="let _ of ' '.repeat(10).split(''); let i = index;">
            <spy-carousel-slide>
              <img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}}">
              <div thumb><img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}} thumb"></div>
            </spy-carousel-slide>
        </ng-container>
      </spy-carousel>
    </div>
  `,
});

export const noThumbs = (args) => ({
    props: args,
    template: `
    <div style="width: 100%">
      <spy-carousel
        [withThumbs]="false"
      >
        <ng-container *ngFor="let _ of ' '.repeat(10).split(''); let i = index;">
            <spy-carousel-slide>
              <img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}}">
              <div thumb><img src="https://swiperjs.com/demos/images/nature-{{i+1}}.jpg" alt="slide {{i+1}} thumb"></div>
            </spy-carousel-slide>
        </ng-container>
      </spy-carousel>
    </div>
  `,
});
