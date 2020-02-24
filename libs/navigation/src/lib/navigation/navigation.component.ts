import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationItem, NavigationComponentMethods } from './navigation';

@Component({
  selector: 'spy-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements NavigationComponentMethods {
  @Input() collapsed = false;
  @Input() items: NavigationItem[] = [];

  collapse(): void {
    this.collapsed = true;
  }

  expand(): void {
    this.collapsed = false;
  }

  toggle(): boolean {
    if (this.collapsed) {
      this.expand();

      return this.isCollapsed();
    }

    this.collapse();

    return this.isCollapsed();
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }
}
