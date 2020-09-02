import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { PersistenceService, ToBoolean } from '@spryker/utils';
import { merge, ReplaySubject, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnChanges, OnInit {
  private static PersistenceKey = 'spy-sidebar-is-collapsed';

  @Input() width = 250;
  @Input() collapsedWidth = 62;
  @Input() spyId?: string;
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() @ToBoolean() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private persistenceKey?: string;
  private isCollapsedStateRetrieved = false;
  arrowIcon = IconArrowDownModule.icon;

  setCollapsedState$ = new ReplaySubject<boolean>();
  initialState$ = of(this.persistenceKey).pipe(
    switchMap(persistenceKey => {
      const key = persistenceKey ?? SidebarComponent.PersistenceKey;

      return this.persistenceService.retrieve(key);
    }),
    tap(() => {
      this.isCollapsedStateRetrieved = true;
    }),
  );

  collapsed$ = merge(this.initialState$, this.setCollapsedState$).pipe(
    tap(isCollapsed => {
      if (this.isCollapsedStateRetrieved) {
        this.isCollapsedStateRetrieved = false;
      } else {
        const key = this.persistenceKey ?? SidebarComponent.PersistenceKey;

        this.persistenceService.save(key, isCollapsed);
      }
    }),
  );

  constructor(private persistenceService: PersistenceService) {}

  ngOnInit(): void {
    if (this.spyId) {
      this.persistenceKey = `spy-sidebar-${this.spyId}-is-collapsed`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('collapsed' in changes) {
      this.setCollapsedState$.next(this.collapsed);
    }
  }

  updateCollapse(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
    this.setCollapsedState$.next(this.collapsed);
    this.collapsedChange.emit(this.isCollapsed());
  }

  collapse(): void {
    this.collapsed = true;
    this.setCollapsedState$.next(this.collapsed);
  }

  expand(): void {
    this.collapsed = false;
    this.setCollapsedState$.next(this.collapsed);
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
