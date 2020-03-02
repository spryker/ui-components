import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { applyContexts } from '@spryker/utils';

@Component({
  selector: 'spy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(elemRef: ElementRef) {
    applyContexts(<HTMLElement>elemRef.nativeElement);
  }
}
