import { Directive, Input } from '@angular/core';
import { ToJson } from '@spryker/utils';
import {
  ButtonAttributes,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from './types';

export class ButtonCoreOptions {
  @Input() shape: ButtonShape = ButtonShape.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() @ToJson() attrs?: ButtonAttributes;
}
