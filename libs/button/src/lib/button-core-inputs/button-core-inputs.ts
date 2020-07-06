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
} from './types';

export const buttonClassName = 'spy-button-core';

@Injectable()
export abstract class ButtonCoreInputs implements AfterViewInit, OnChanges {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() @ToJson() attrs?: ButtonAttributes;

  @ViewChild('buttonRef') buttonRef?: ElementRef;

  protected abstract buttonClassName?: string;

  constructor(private renderer: Renderer2) {}

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

    // tslint:disable-next-line: no-non-null-assertion
    this.renderer.addClass(this.buttonRef.nativeElement, this.buttonClassName!);
    this.renderer.addClass(this.buttonRef.nativeElement, buttonClassName);
    this.changeClassName(this.shape);
    this.changeClassName(this.size);
    this.changeClassName(this.variant);
  }

  private changeClassName(type: string, previousValue?: string): void {
    if (previousValue) {
      this.renderer.removeClass(this.buttonRef?.nativeElement, previousValue);
    }

    this.renderer.addClass(
      this.buttonRef?.nativeElement,
      `${this.buttonClassName}--${type}`,
    );
  }
}
