import {
  AfterViewInit,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  Directive,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import {
  ButtonAttributes,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from './types';

export const buttonClassName = 'spy-button-core';

@Directive({
  selector: '[spyButtonCoreInputs]',
})
export class ButtonCoreInputs {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() @ToJson() attrs?: ButtonAttributes;
}

@Directive({
  selector: '[spyButtonCore]',
})
export class ButtonCore extends ButtonCoreInputs
  implements AfterViewInit, OnChanges {
  @ViewChild('buttonRef') buttonRef?: ElementRef;

  protected buttonClassName = '';

  constructor(protected renderer: Renderer2, protected elemRef: ElementRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.setClassList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('shape' in changes) {
      this.changeClassName(this.shape, changes.shape.previousValue);
    }

    if ('size' in changes) {
      this.changeClassName(this.size, changes.size.previousValue);
    }

    if ('variant' in changes) {
      this.changeClassName(this.variant, changes.variant.previousValue);
    }
  }

  private setClassList(): void {
    this.renderer.addClass(this.elemRef.nativeElement, this.buttonClassName);
    this.renderer.addClass(this.elemRef.nativeElement, buttonClassName);
    this.renderer.addClass(
      this.buttonRef?.nativeElement,
      `${this.buttonClassName}__btn`,
    );
    this.renderer.addClass(
      this.buttonRef?.nativeElement,
      `${buttonClassName}__btn`,
    );

    this.changeClassName(this.shape);
    this.changeClassName(this.size);
    this.changeClassName(this.variant);
  }

  private changeClassName(type: string, previousValue?: string): void {
    if (previousValue) {
      this.renderer.removeClass(
        this.elemRef.nativeElement,
        `${this.buttonClassName}--${previousValue}`,
      );
      this.renderer.removeClass(
        this.elemRef.nativeElement,
        `${buttonClassName}--${previousValue}`,
      );
    }

    this.renderer.addClass(
      this.elemRef.nativeElement,
      `${this.buttonClassName}--${type}`,
    );
    this.renderer.addClass(
      this.elemRef.nativeElement,
      `${buttonClassName}--${type}`,
    );
  }
}
