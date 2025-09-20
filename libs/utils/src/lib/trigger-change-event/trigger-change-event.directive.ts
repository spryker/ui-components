import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { triggerChangeEvent } from './trigger-change-event-function';

@Directive({ standalone: false, selector: '[spyTriggerChangeEvent]' })
export class TriggerChangeEventDirective {
    private el = inject(ElementRef);

    @Input() spyTriggerChangeEvent?: HTMLElement | string;

    @HostListener('click', ['$event'])
    onClick(): void {
        typeof this.spyTriggerChangeEvent === 'string'
            ? triggerChangeEvent(this.el.nativeElement.querySelector(this.spyTriggerChangeEvent || 'input'))
            : triggerChangeEvent(this.spyTriggerChangeEvent);
    }
}
