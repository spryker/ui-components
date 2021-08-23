import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SpinnerSize } from '../types';

@Component({
  selector: 'spy-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  @Input() delay?: number;
  @Input() size = SpinnerSize.Default;
  @Input() isSpinning = false;
  @Input() overlayContent = false;
}
