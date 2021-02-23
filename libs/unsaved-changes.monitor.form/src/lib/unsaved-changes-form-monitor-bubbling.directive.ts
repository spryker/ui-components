import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * Responsible prevent bubbling of input event.
 */
@Directive({
  selector: '[spyUnsavedChangesFormMonitorBubbling]',
})
export class UnsavedChangesFormMonitorBubblingDirective implements OnInit {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.listen(this.elementRef.nativeElement, 'input', (event) => {
      event.stopImmediatePropagation();
    });
  }
}
