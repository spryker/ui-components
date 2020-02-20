import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
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
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NavigationComponent implements OnInit, NavigationComponent {
  @Input() collapsed: boolean = false;
  @Input() items: NavigationItem[] = [
    {title: 'Dashboard', url: '', icon: 'dashboard', isActive: false, subItems: [
        {title: 'Dashboard2', url: '', icon: '', isActive: false, subItems: []}
      ]},
    {title: 'Orders', url: '', icon: 'orders', isActive: false, subItems: []},
    {title: 'Offers', url: '', icon: 'offers', isActive: true, subItems: []},
    {title: 'Merchant', url: '', icon: 'merchant', isActive: false, subItems: []}
  ];
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

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
