import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonCoreOptions } from '../button-core-options/button-core-options';
@Component({
  selector: 'spy-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLinkComponent extends ButtonCoreOptions {
  @Input() url?: string;
}
