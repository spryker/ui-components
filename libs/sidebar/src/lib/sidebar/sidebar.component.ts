import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SidebarComponent {
  @Input() trigger: null | TemplateRef<void> = null;
  @Input() collapsed: boolean = false;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  private collapse(): void {
    this.collapsed = true;

    this.collapsedChange.emit(this.isCollapsed());
  }

  private expand(): void {
    this.collapsed = false;

    this.collapsedChange.emit(this.isCollapsed());
  }

  private isCollapsed(): boolean {
    return this.collapsed;
  }

  toggle(): boolean {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }

    return this.isCollapsed();
  }
}
