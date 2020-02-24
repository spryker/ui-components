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

  collapse(): void {
    this.collapsed = true;
  }

  expand(): void {
    this.collapsed = false;
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }

  toggle(isCollapsed: boolean): boolean {
    this.collapsed = isCollapsed;

    this.collapsedChange.emit(this.isCollapsed());
    return this.isCollapsed();
  }
}
