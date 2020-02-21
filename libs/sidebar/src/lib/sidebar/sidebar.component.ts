import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SidebarComponent {
  @Input() width = 200;
  @Input() collapsedWidth = 64;
  @Input() trigger: null | TemplateRef<void> = null;
  @Input() collapsed = false;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  private collapse(): void {
    this.collapsed = true;
  }

  private expand(): void {
    this.collapsed = false;
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }

  toggle(): boolean {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }

    this.collapsedChange.emit(this.isCollapsed());
    return this.isCollapsed();
  }
}
