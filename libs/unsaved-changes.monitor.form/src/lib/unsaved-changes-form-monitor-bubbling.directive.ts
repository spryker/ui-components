import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';

/**
 * Responsible prevent bubbling of input event.
 */
@Directive({ standalone: false, selector: '[spyUnsavedChangesFormMonitorBubbling]' })
export class UnsavedChangesFormMonitorBubblingDirective implements OnInit, OnDestroy {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);

    private disposeInputEvent?: () => void;

    ngOnInit(): void {
        this.disposeInputEvent = this.renderer.listen(this.elementRef.nativeElement, 'input', (event) => {
            this.eventStopPropagation(event);
        });
    }

    ngOnDestroy(): void {
        this.disposeInputEvent?.();
        this.disposeInputEvent = undefined;
    }

    private eventStopPropagation(event: Event) {
        event.stopImmediatePropagation();
    }
}
