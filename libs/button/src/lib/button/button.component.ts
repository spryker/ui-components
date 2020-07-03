import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { ButtonCoreOptions } from '../button-core-options/button-core-options';

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
export class ButtonComponent extends ButtonCoreOptions {
  @Input() type: ButtonType = ButtonType.Button;
  @Input() @ToBoolean() disabled = false;

  @ViewChild('buttonRef') buttonRef?: ElementRef;

  click(): void {
    this.buttonRef?.nativeElement.click();
  }
}
