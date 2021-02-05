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
  static shapeDefault = ButtonShape.Default;
  static sizeDefault = ButtonSize.Medium;
  static variantDefault = ButtonVariant.Primary;

  @Input() shape: ButtonShape = ButtonCoreInputs.shapeDefault;
  @Input() size: ButtonSize = ButtonCoreInputs.sizeDefault;
  @Input() variant: ButtonVariant = ButtonCoreInputs.variantDefault;
  @Input() @ToJson() attrs?: ButtonAttributes;
}

@Directive({
  selector: '[spyButtonCore]',
})
export class ButtonCore
  extends ButtonCoreInputs
  implements AfterViewInit, OnChanges {
  @ViewChild('buttonRef') buttonRef?: ElementRef<HTMLElement>;

  protected buttonClassName = '';

  constructor(protected renderer: Renderer2, protected elemRef: ElementRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.setClassList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('shape' in changes) {
      this.changeClassName(
        this.shape ?? ButtonCoreInputs.shapeDefault,
        changes.shape.previousValue,
      );
    }

    if ('size' in changes) {
      this.changeClassName(
        this.size ?? ButtonCoreInputs.sizeDefault,
        changes.size.previousValue,
      );
    }

    if ('variant' in changes) {
      this.changeClassName(
        this.variant ?? ButtonCoreInputs.variantDefault,
        changes.variant.previousValue,
      );
    }
  }

  click() {
    this.buttonRef?.nativeElement.click();
  }

  private setClassList(): void {
    this.renderer.addClass(this.elemRef.nativeElement, this.buttonClassName);
    this.renderer.addClass(this.elemRef.nativeElement, buttonClassName);

    if (this.buttonRef) {
      this.renderer.addClass(
        this.buttonRef.nativeElement,
        `${this.buttonClassName}__btn`,
      );
      this.renderer.addClass(
        this.buttonRef.nativeElement,
        `${buttonClassName}__btn`,
      );
    }

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
