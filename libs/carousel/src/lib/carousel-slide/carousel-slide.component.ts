import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'spy-carousel-slide',
    templateUrl: './carousel-slide.component.html',
    styleUrls: ['./carousel-slide.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-carousel-slide',
    },
})
export class CarouselSlideComponent {
    @ViewChild('contentTpl', { static: true })
    template!: TemplateRef<void>;
    @ViewChild('thumbContentTpl', { static: true })
    thumbTemplate!: TemplateRef<void>;
}
