import { Directive, Input, OnInit, OnChanges } from '@angular/core';
import { ToJson } from '@spryker/utils';
import {
  ButtonAttributes,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from './types';

export const buttonClassName = 'spy-button';

@Directive({
  selector: '[spyButtonCoreOptions]',
})
export class ButtonCoreOptions implements OnInit, OnChanges {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() @ToJson() attrs?: ButtonAttributes;

  classList?: string;

  ngOnInit(): void {
    this.setClassList();
  }

  ngOnChanges(): void {
    this.setClassList();
  }

  private setClassList(): void {
    this.classList = `
      ${buttonClassName}
      ${buttonClassName}--${this.shape}
      ${buttonClassName}--${this.size}
      ${buttonClassName}--${this.variant}
    `;
  }
}
