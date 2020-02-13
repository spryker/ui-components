import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[applyAttrs]',
})
export class ApplyAttrsDirective implements OnChanges {
  @Input() applyAttrs: Record<string, string> = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  updateAttrs(): void {
    if (!this.applyAttrs) {
      return;
    }

    const element = this.el.nativeElement;
    const attrArray: [string, string][] = Object.entries(this.applyAttrs);

    attrArray.forEach(([key, value]) => {
      this.renderer.setAttribute(element, key, value);
    });
  }

  deleteAttrs(prevAttrs: Record<string, string>): void {
    const element = this.el.nativeElement;
    const prevAttrsArray = Object.entries(prevAttrs);

    prevAttrsArray.forEach(([key]) => {
      const shouldKeepAttr = this.applyAttrs && key in this.applyAttrs;

      if (shouldKeepAttr) {
        return;
      }

      this.renderer.removeAttribute(element, key);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { firstChange, previousValue } = changes.applyAttrs;

    if (!firstChange) {
      this.deleteAttrs(previousValue);
    }

    this.updateAttrs();
  }
}
