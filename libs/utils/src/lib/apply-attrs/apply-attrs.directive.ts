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
    const element = this.el.nativeElement;
    const attrArray: [string, string][] = Object.entries(this.applyAttrs);

    attrArray.forEach(([key, value]) => {
      this.renderer.setAttribute(element, key, value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateAttrs();
  }
}
