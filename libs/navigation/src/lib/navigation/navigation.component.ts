import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationItem, NavigationComponentMethods } from './navigation';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements NavigationComponentMethods {
  @Input() @ToBoolean() collapsed = false;
  @Input() @ToJson() items: NavigationItem[] = [];

  collapse(): void {
    this.collapsed = true;
  }

  expand(): void {
    this.collapsed = false;
  }

  toggle(): boolean {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }

    return this.isCollapsed();
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }
}
