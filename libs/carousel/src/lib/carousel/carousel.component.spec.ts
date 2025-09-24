import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';
import { CarouselOptions } from '../types';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  const projectedContent = `
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
    </spy-carousel-slide>`;

  const defaultInputs: {
    config: CarouselOptions;
    thumbConfig: CarouselOptions;
    withThumbs: boolean;
    withoutNavSlidesAmount: number;
  } = {
    config: {
      slidesPerView: 'auto',
    },
    thumbConfig: {
      slidesPerView: 'auto',
      spaceBetween: 10,
    },
    withThumbs: true,
    withoutNavSlidesAmount: 6,
  };

  const { testModule, createComponent } = getTestingForComponent(CarouselComponent, {
    ngModule: {
      imports: [],
      declarations: [CarouselSlideComponent],
      exports: [CarouselSlideComponent],
      schemas: [NO_ERRORS_SCHEMA],
    },
    projectContent: projectedContent,
  });

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render main swiper', async () => {
    const host = await createComponent(defaultInputs, true);
    const mainSwiper = host.queryCss('swiper-container');
    expect(mainSwiper).toBeTruthy();
    expect(mainSwiper.nativeNode.swiperParams.slidesPerView).toBe(defaultInputs.config.slidesPerView);
  });

  it('should not render thumbs if not withThumbs', async () => {
    const host = await createComponent({ ...defaultInputs, withThumbs: false }, true);
    const swipers = host.fixture.debugElement.queryAll(By.css('swiper-container'));
    expect(swipers).toBeTruthy();
    expect(swipers.length).toBe(1);
    const nextButton = host.fixture.debugElement.query(By.css('.spy-carousel__navigation-button--next'));
    expect(nextButton).toBeFalsy();

    const prevButton = host.fixture.debugElement.query(By.css('.spy-carousel__navigation-button--prev'));
    expect(prevButton).toBeFalsy();
  });

  it('should render thumbs', async () => {
    const host = await createComponent({ ...defaultInputs, withThumbs: true }, true);
    const swipers = host.fixture.debugElement.queryAll(By.css('swiper-container'));

    expect(swipers).toBeTruthy();
    expect(swipers.length).toBe(2);

    const thumbsSwiper = swipers[1];

    expect(thumbsSwiper.nativeNode.swiperParams.slidesPerView).toBe(defaultInputs.thumbConfig.slidesPerView);
    expect(thumbsSwiper.nativeNode.swiperParams.spaceBetween).toBe(defaultInputs.thumbConfig.spaceBetween);
  });

  it('should render navigation buttons', async () => {
    const host = await createComponent(defaultInputs, true);

    const nextButton = host.fixture.debugElement.query(By.css('.spy-carousel__navigation-button--next'));
    expect(nextButton).toBeTruthy();

    const prevButton = host.fixture.debugElement.query(By.css('.spy-carousel__navigation-button--prev'));
    expect(prevButton).toBeTruthy();
  });
});
