import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { applyContexts } from '@spryker/utils';

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
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(elemRef: ElementRef) {
    applyContexts(<HTMLElement>elemRef.nativeElement);
  }

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
