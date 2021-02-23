import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToBoolean, ToJson } from '../../../../utils/src';
import { IconOpenEyeModule, IconCrossedEyeModule } from '@spryker/icon/icons';

@Component({
  selector: 'spy-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spy-input-password',
  },
})
export class InputPasswordComponent {
  @Input() name?: string;
  @Input() value?: string;
  @Input() spyId = '';
  @Input() placeholder = '';
  @Input() outerPrefix?: string | TemplateRef<void>;
  @Input() outerSuffix?: string | TemplateRef<void>;
  @Input() @ToBoolean() readOnly?: boolean;
  @Input() @ToBoolean() disabled?: boolean;
  @Input() @ToBoolean() required?: boolean;
  @Input() @ToJson() attrs?: Record<string, string>;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  isPasswordHidden = true;
  type = 'password';
  iconName = IconOpenEyeModule.icon;

  togglePasswordVisibility(): void {
    if (this.disabled) {
      return;
    }
    this.isPasswordHidden = !this.isPasswordHidden;
    this.type = this.isPasswordHidden ? 'password' : 'text';
    this.iconName = this.isPasswordHidden
      ? IconOpenEyeModule.icon
      : IconCrossedEyeModule.icon;
  }
}
