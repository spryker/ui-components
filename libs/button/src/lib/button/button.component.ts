import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

import { ButtonCore } from '../button-core-inputs/button-core-inputs';

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
}

@Component({
  selector: 'spy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonCore {
  @Input() type: ButtonType = ButtonType.Button;
  @Input() @ToBoolean() disabled = false;

  buttonClassName = 'spy-button';

  click(): void {
    this.buttonRef?.nativeElement.click();
  }
}
