import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

/**
 * Responsible prevent bubbling of input event.
 */
@Directive({
  selector: '[spyUnsavedChangesFormMonitorBubbling]',
})
export class UnsavedChangesFormMonitorBubblingDirective
  implements OnInit, OnDestroy {
  private disposeChangeEvent?: () => void;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.disposeChangeEvent = this.renderer.listen(
      this.elementRef.nativeElement,
      'input',
      (event) => {
        this.eventStopPropagation(event);
      },
    );
  }

  ngOnDestroy(): void {
    this.disposeChangeEvent?.();
    this.disposeChangeEvent = undefined;
  }

  private eventStopPropagation(event: Event) {
    event.stopImmediatePropagation();
  }
}
