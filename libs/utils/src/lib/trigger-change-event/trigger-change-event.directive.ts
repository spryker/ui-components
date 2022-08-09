import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { triggerChangeEvent } from './trigger-change-event-function';

@Directive({
    selector: '[spyTriggerChangeEvent]',
})
export class TriggerChangeEventDirective {
    @Input() spyTriggerChangeEvent?: HTMLElement | string;

    @HostListener('click', ['$event'])
    onClick(): void {
        typeof this.spyTriggerChangeEvent === 'string'
            ? triggerChangeEvent(this.el.nativeElement.querySelector(this.spyTriggerChangeEvent || 'input'))
            : triggerChangeEvent(this.spyTriggerChangeEvent);
    }

    constructor(private el: ElementRef) {}
}
