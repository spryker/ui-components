import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonCore } from '../button-core-inputs/button-core-inputs';

@Component({
  selector: 'spy-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLinkComponent extends ButtonCore {
  buttonClassName = 'spy-button-link';

  @Input() url?: string;
}
