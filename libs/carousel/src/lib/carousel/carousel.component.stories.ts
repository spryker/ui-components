import { CarouselModule } from '../carousel.module';

export default {
  title: 'CarouselComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CarouselModule],
  },
  template: `
    <spy-carousel></spy-carousel>
  `,
  props: {},
});
