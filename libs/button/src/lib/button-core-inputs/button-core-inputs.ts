import {
  AfterViewInit,
  ElementRef,
  Injectable,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ToJson } from '@spryker/utils';

import {
  ButtonAttributes,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonAjaxMethod,
} from './types';

export const buttonClassName = 'spy-button-core';

@Injectable()
export class ButtonCoreInputs {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() method?: ButtonAjaxMethod = ButtonAjaxMethod.Get;
  @Input() url? = '';
  @Input() @ToJson() attrs?: ButtonAttributes;
}

@Injectable()
export abstract class ButtonCore extends ButtonCoreInputs
  implements AfterViewInit, OnChanges {
  @ViewChild('buttonRef') buttonRef?: ElementRef;

  protected abstract buttonClassName: string;

  constructor(public renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    this.setClassList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.buttonRef) {
      return;
    }

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
    if (!this.buttonRef) {
      return;
    }

    this.renderer.addClass(this.buttonRef.nativeElement, this.buttonClassName);
    this.renderer.addClass(this.buttonRef.nativeElement, buttonClassName);
    this.changeClassName(this.shape);
    this.changeClassName(this.size);
    this.changeClassName(this.variant);
  }

  private changeClassName(type: string, previousValue?: string): void {
    if (previousValue) {
      this.renderer.removeClass(
        this.buttonRef?.nativeElement,
        `${this.buttonClassName}--${previousValue}`,
      );
      this.renderer.removeClass(
        this.buttonRef?.nativeElement,
        `${buttonClassName}--${previousValue}`,
      );
    }

    this.renderer.addClass(
      this.buttonRef?.nativeElement,
      `${this.buttonClassName}--${type}`,
    );
    this.renderer.addClass(
      this.buttonRef?.nativeElement,
      `${buttonClassName}--${type}`,
    );
  }
}
