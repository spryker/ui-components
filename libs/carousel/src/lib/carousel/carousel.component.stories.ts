import { CarouselModule } from '../carousel.module';

export default {
  title: 'CarouselComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CarouselModule],
  },
  template: `
    <spy-carousel>
      <spy-carousel-slide>Slide 1</spy-carousel-slide>
      <spy-carousel-slide>Slide 2</spy-carousel-slide>
      <spy-carousel-slide>Slide 3</spy-carousel-slide>
      <spy-carousel-slide>Slide 4</spy-carousel-slide>
      <spy-carousel-slide>Slide 5</spy-carousel-slide>
      <spy-carousel-slide>Slide 6</spy-carousel-slide>

      <spy-carousel-slide isThumb>Thumb Slide 1</spy-carousel-slide>
      <spy-carousel-slide isThumb>Thumb Slide 2</spy-carousel-slide>
      <spy-carousel-slide isThumb>Thumb Slide 3</spy-carousel-slide>
      <spy-carousel-slide isThumb>Thumb Slide 4</spy-carousel-slide>
      <spy-carousel-slide isThumb>Thumb Slide 5</spy-carousel-slide>
      <spy-carousel-slide isThumb>Thumb Slide 6</spy-carousel-slide>
    </spy-carousel>
  `,
  props: {},
});
