import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[attrParser]',
})
export class AttrParser implements OnChanges {
  @Input() attrParser: Record<string, string> | string = {};

  constructor(protected el: ElementRef, protected renderer: Renderer2) {}

  attrCasting(): Record<string, string> {
    return typeof this.attrParser === 'string'
      ? JSON.parse(this.attrParser)
      : this.attrParser;
  }

  attrSetting(): void {
    const element = this.el.nativeElement;
    const attrArray: [string, string][] = Object.entries(this.attrCasting());

    if (!attrArray.length) {
      return;
    }

    attrArray.forEach(([key, value]) => {
      this.renderer.setAttribute(element, key, value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.attrSetting();
  }
}
