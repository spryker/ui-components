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
      <spy-carousel-slide>
        Slide 1
        <div thumb>
          <img src="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612" alt="thumb" />
        </div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 2
        <div thumb>
          <img src="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612" alt="thumb" />
        </div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 3
        <div thumb>
          <img src="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612" alt="thumb" />
        </div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 4
        <div thumb>
          <img src="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612" alt="thumb" />
        </div>
      </spy-carousel-slide>
      <spy-carousel-slide>
        Slide 5
        <div thumb>
          <img src="https://media.istockphoto.com/photos/buddha-imagee-on-the-tree-picture-id510216752?s=612x612" alt="thumb" />
        </div>
      </spy-carousel-slide>
    </spy-carousel>
  `,
  props: {},
});
