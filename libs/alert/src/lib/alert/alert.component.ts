import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

enum AlertType {
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
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AlertComponent {
  @Input() type: AlertType = AlertType.Info;
}
