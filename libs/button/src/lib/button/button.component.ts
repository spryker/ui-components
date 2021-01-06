import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

import { ButtonCore } from '../button-core/button-core';

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
  host: {
    '[class.spy-button--disabled]': 'disabled',
  },
})
export class ButtonComponent extends ButtonCore {
  @Input() type: ButtonType = ButtonType.Button;
  @Input() @ToBoolean() disabled = false;
  @Input() loading?: Boolean;

  protected buttonClassName = 'spy-button';
}
