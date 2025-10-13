import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-carousel-slide',
    templateUrl: './carousel-slide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CarouselSlideComponent {
    @ViewChild('contentTpl', { static: true })
    template!: TemplateRef<void>;
    @ViewChild('thumbContentTpl', { static: true })
    thumbTemplate!: TemplateRef<void>;
}
