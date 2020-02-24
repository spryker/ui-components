import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

@Component({
  selector: 'spy-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AlertComponent {
  @Input() type: 'info' | 'error' | 'warning' | 'success' = 'error';
}
