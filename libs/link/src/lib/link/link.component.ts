import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ElementRef } from '@angular/core';

@Component({
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
    @Input() icon?: string;

    constructor(private element: ElementRef) {}

    click(): void {
        this.element.nativeElement.click();
    }
}
