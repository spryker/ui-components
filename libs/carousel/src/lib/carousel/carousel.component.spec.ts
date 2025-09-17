import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';
import { CarouselOptions } from '../types';
import { CarouselComponent } from './carousel.component';

@Component({
    standalone: false,
    template: `
        <spy-carousel
            [config]="config"
            [thumbConfig]="thumbConfig"
            [withThumbs]="withThumbs"
            [withoutNavSlidesAmount]="withoutNavSlidesAmount"
        >
            <spy-carousel-slide>
                <img src="https://source.unsplash.com/random/800x450" alt="slide 1" />
                <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 1 thumb" /></div>
            </spy-carousel-slide>
            <spy-carousel-slide>
                <img src="https://source.unsplash.com/random/800x450" alt="slide 2" />
                <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 2 thumb" /></div>
            </spy-carousel-slide>
            <spy-carousel-slide>
                <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div thumb><img src="https://source.unsplash.com/niUkImZcSP8/160x90" alt="slide 3 thumb" /></div>
            </spy-carousel-slide>
            <spy-carousel-slide>
                <img src="https://source.unsplash.com/random/800x450" alt="slide 4" />
                <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 4 thumb" /></div>
            </spy-carousel-slide>
            <spy-carousel-slide>
                <img src="https://source.unsplash.com/random/800x450" alt="slide 5" />
                <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 5 thumb" /></div>
            </spy-carousel-slide>
            <spy-carousel-slide>
                <img src="https://source.unsplash.com/random/800x450" alt="slide 6" />
                <div thumb><img src="https://source.unsplash.com/160x90" alt="slide 6 thumb" /></div>
            </spy-carousel-slide>
        </spy-carousel>
    `,
})
class TestHostComponent {
    @Input() config!: CarouselOptions;
    @Input() thumbConfig!: CarouselOptions;
    @Input() withThumbs!: boolean;
    @Input() withoutNavSlidesAmount!: number;
}

describe('CarouselComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    const defaultInputs = {
        config: { slidesPerView: 'auto' } as CarouselOptions,
        thumbConfig: { slidesPerView: 'auto', spaceBetween: 10 } as CarouselOptions,
        withThumbs: true,
        withoutNavSlidesAmount: 6,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselComponent, CarouselSlideComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        Object.assign(fixture.componentInstance, defaultInputs);
        fixture.detectChanges();
    });

    it('should render main swiper', () => {
        const mainSwiper = fixture.debugElement.query(By.css('swiper-container'));
        expect(mainSwiper).toBeTruthy();
        const params = (mainSwiper.nativeElement as any).swiperParams;
        expect(params.slidesPerView).toBe(defaultInputs.config.slidesPerView);
    });

    it('should not render thumbs if not withThumbs', () => {
        fixture.componentInstance.withThumbs = false;
        fixture.detectChanges();

        const swipers = fixture.debugElement.queryAll(By.css('swiper-container'));
        expect(swipers).toBeTruthy();
        expect(swipers.length).toBe(1);

        const nextButton = fixture.debugElement.query(By.css('.spy-carousel__navigation-button--next'));
        expect(nextButton).toBeFalsy();

        const prevButton = fixture.debugElement.query(By.css('.spy-carousel__navigation-button--prev'));
        expect(prevButton).toBeFalsy();
    });

    it('should render thumbs', () => {
        fixture.componentInstance.withThumbs = true;
        fixture.detectChanges();

        const swipers = fixture.debugElement.queryAll(By.css('swiper-container'));
        expect(swipers).toBeTruthy();
        expect(swipers.length).toBe(2);

        const thumbsSwiper = swipers[1];
        const params = (thumbsSwiper.nativeElement as any).swiperParams;
        expect(params.slidesPerView).toBe(defaultInputs.thumbConfig.slidesPerView);
        expect(params.spaceBetween).toBe(defaultInputs.thumbConfig.spaceBetween);
    });

    it('should render navigation buttons', () => {
        fixture.componentInstance.withThumbs = true;
        fixture.detectChanges();

        const nextButton = fixture.debugElement.query(By.css('.spy-carousel__navigation-button--next'));
        expect(nextButton).toBeTruthy();

        const prevButton = fixture.debugElement.query(By.css('.spy-carousel__navigation-button--prev'));
        expect(prevButton).toBeTruthy();
    });
});
