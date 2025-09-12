import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ElementRef, inject } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-link',
        role: 'button',
    },
})
export class LinkComponent {
    private element = inject(ElementRef);

    @Input() icon?: string;

    click(): void {
        this.element.nativeElement.click();
    }
}
