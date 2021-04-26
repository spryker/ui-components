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
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 1</spy-carousel-slide>
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 2</spy-carousel-slide>
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 3</spy-carousel-slide>
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 4</spy-carousel-slide>
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 5</spy-carousel-slide>
      <spy-carousel-slide thumb="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612">Slide 6</spy-carousel-slide>
    </spy-carousel>
  `,
  props: {},
});
