import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { ToBoolean, ToJson } from '@spryker/utils';
import { ButtonAttributes } from '../..';

@Component({
  selector: 'spy-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spy-button-toggle',
  },
})
export class ButtonToggleComponent {
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() toggled = false;
  @Output() toggledChange = new EventEmitter<boolean>();
  @Input() @ToJson() attrs?: ButtonAttributes;
  @ViewChild('buttonRef') buttonRef?: ElementRef;

  click(): void {
    this.buttonRef?.nativeElement.click();
  }

  clickHandler(): void {
    this.toggled = !this.toggled;
    this.toggledChange.emit(this.toggled);
  }
}
