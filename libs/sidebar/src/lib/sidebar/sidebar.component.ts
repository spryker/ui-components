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
import { PersistenceService } from '@spryker/persistence';
import { ToBoolean } from '@spryker/utils';
import { merge, ReplaySubject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnChanges, OnInit {
  @Input() width = 250;
  @Input() collapsedWidth = 96;
  @Input() spyId?: string;
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() @ToBoolean() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private isCollapsedStateRetrieved = false;
  arrowIcon = IconArrowDownModule.icon;

  setCollapsedState$ = new ReplaySubject<boolean>();
  spyId$ = new ReplaySubject<string>();
  persistenceKey$ = this.spyId$.pipe(
    map((spyId) => `spy-sidebar-${spyId ?? ''}-is-collapsed`),
  );
  initialState$ = this.persistenceKey$.pipe(
    switchMap((persistenceKey) => {
      return this.persistenceService.retrieve(persistenceKey);
    }),
    tap(() => {
      this.isCollapsedStateRetrieved = true;
    }),
  );

  collapsed$ = merge(this.initialState$, this.setCollapsedState$).pipe(
    withLatestFrom(this.persistenceKey$),
    tap(([isCollapsed, persistenceKey]) => {
      if (this.isCollapsedStateRetrieved) {
        this.isCollapsedStateRetrieved = false;
      } else {
        this.persistenceService.save(persistenceKey, isCollapsed);
      }
    }),
    map(([isCollapsed]) => isCollapsed),
  );

  constructor(private persistenceService: PersistenceService) {}

  ngOnInit(): void {
    this.spyId$.next(String(this.spyId));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('collapsed' in changes) {
      this.setCollapsedState$.next(this.collapsed);
    }

    if ('spyId' in changes && !changes.spyId.firstChange) {
      this.spyId$.next(String(this.spyId));
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
