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

export const buttonClassName = 'spy-button';

@Injectable()
export class ButtonCoreInputs implements AfterViewInit, OnChanges {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() @ToJson() attrs?: ButtonAttributes;

  @ViewChild('buttonRef') buttonRef?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setClassList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.buttonRef) {
      return;
    }

    if ('shape' in changes) {
      this.renderer.addClass(
        this.buttonRef?.nativeElement,
        `
          ${buttonClassName}--${this.shape}
        `,
      );
    }

    if ('size' in changes) {
      this.renderer.addClass(
        this.buttonRef?.nativeElement,
        `
          ${buttonClassName}--${this.size}
        `,
      );
    }

    if ('variant' in changes) {
      this.renderer.addClass(
        this.buttonRef?.nativeElement,
        `
          ${buttonClassName}--${this.variant}
        `,
      );
    }
  }

  private setClassList(): void {
    if (!this.buttonRef) {
      return;
    }

    this.renderer.addClass(this.buttonRef.nativeElement, buttonClassName);
    this.renderer.addClass(
      this.buttonRef.nativeElement,
      `${buttonClassName}--${this.shape}`,
    );
    this.renderer.addClass(
      this.buttonRef.nativeElement,
      `${buttonClassName}--${this.size}`,
    );
    this.renderer.addClass(
      this.buttonRef.nativeElement,
      `${buttonClassName}--${this.variant}`,
    );
  }
}
