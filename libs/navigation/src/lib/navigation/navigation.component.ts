import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
  SimpleChanges
} from '@angular/core';

export interface NavigationComponent {
  collapse(): void;
  expand(): void;
  toggle(): boolean;
  isCollapsed(): boolean;
}

interface NavigationItem {
  title: string;
  url?: string;
  icon?: string;
  isActive?: boolean;
  subItems?: NavigationItem[];
}

@Component({
  selector: 'spy-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements NavigationComponent, OnChanges {
  @Input() collapsed = false;
  @Input() items: NavigationItem[] = [];
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if ('collapsed' in changes) {
      this.collapsedChange.emit(this.isCollapsed());
    }
  }

  collapse(): void {
    this.collapsed = true;
    this.collapsedChange.emit(this.isCollapsed());
  }

  expand(): void {
    this.collapsed = false;
    this.collapsedChange.emit(this.isCollapsed());
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
