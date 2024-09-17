import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { IconPaginationArrowModule } from '@spryker/icon/icons';
import { BehaviorSubject } from 'rxjs';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';
import { CarouselOptions } from '../types';

@Component({
    selector: 'spy-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-carousel',
    },
})
export class CarouselComponent implements AfterViewInit {
    constructor() {
        register();
    }

    @Input() config: CarouselOptions = {};
    @Input() thumbConfig: CarouselOptions = {};
    @Input() withThumbs = false;

    @ViewChild('carousel', { static: false }) carousel!: ElementRef<SwiperContainer>;
    @ViewChild('thumbs', { static: false }) thumbs?: ElementRef<SwiperContainer>;

    slideReference = CarouselSlideComponent;

    paginationArrowIcon = IconPaginationArrowModule.icon;

    slides$ = new BehaviorSubject<CarouselSlideComponent[]>([]);

    @ContentChildren(CarouselSlideComponent)
    set contentSlides(slides: QueryList<CarouselSlideComponent>) {
        this.slides$.next(slides.toArray());
    }

    ngAfterViewInit(): void {
        Object.assign(this.carousel.nativeElement, {
            navigation: true,
            ...this.config,
        } satisfies SwiperOptions);
        this.carousel.nativeElement.initialize();

        if (!this.withThumbs) {
            return;
        }

        Object.assign(this.thumbs.nativeElement, {
            spaceBetween: 10,
            navigation: {
                nextEl: '.spy-carousel__navigation-button--next',
                prevEl: '.spy-carousel__navigation-button--prev',
            },
            ...this.thumbConfig,
        } satisfies SwiperOptions);
        this.thumbs.nativeElement.initialize();
    }

    slidesFound(slides: CarouselSlideComponent[]): void {
        this.slides$.next(slides);
    }
}
