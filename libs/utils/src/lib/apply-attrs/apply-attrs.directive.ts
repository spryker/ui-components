import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[spyApplyAttrs]',
})
export class ApplyAttrsDirective implements OnChanges {
  @Input() spyApplyAttrs: Record<string, string> = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  updateAttrs(): void {
    if (!this.spyApplyAttrs) {
      return;
    }

    const element = this.el.nativeElement;
    const attrArray: [string, string][] = Object.entries(this.spyApplyAttrs);

    attrArray.forEach(([key, value]) => {
      this.renderer.setAttribute(element, key, value);
    });
  }

  deleteAttrs(prevAttrs: Record<string, string>): void {
    const element = this.el.nativeElement;
    const prevAttrsArray = Object.entries(prevAttrs);

    prevAttrsArray.forEach(([key]) => {
      const shouldKeepAttr = this.spyApplyAttrs && key in this.spyApplyAttrs;

      if (shouldKeepAttr) {
        return;
      }

      this.renderer.removeAttribute(element, key);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.spyApplyAttrs && changes.spyApplyAttrs.previousValue) {
      this.deleteAttrs(changes.spyApplyAttrs.previousValue);
    }

    this.updateAttrs();
  }
}
