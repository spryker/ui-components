import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  @Input() width = 250;
  @Input() collapsedWidth = 62;
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() @ToBoolean() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  arrowIcon = IconArrowDownModule.icon;

  updateCollapse(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;

    this.collapsedChange.emit(this.isCollapsed());
  }

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
