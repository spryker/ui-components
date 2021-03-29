import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
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
})
export class ButtonComponent extends ButtonCore {
  @Input() type: ButtonType = ButtonType.Button;
  @Input()
  @HostBinding('class.spy-button--disabled')
  @ToBoolean()
  disabled = false;
  @Input() loading?: Boolean;

  protected buttonClassName = 'spy-button';
}
