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
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private toggleCollapse(isCollapsed: boolean): void {
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
    this.collapsed = !this.collapsed;

    this.collapsedChange.emit(this.isCollapsed());
    return this.isCollapsed();
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }
}
