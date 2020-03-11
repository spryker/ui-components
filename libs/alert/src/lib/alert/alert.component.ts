import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IconErrorModule } from '@spryker/icon/icons';

export enum AlertType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

@Component({
  selector: 'spy-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
  @Input() type: AlertType = AlertType.Info;

  errorIcon = IconErrorModule.icon;
}
