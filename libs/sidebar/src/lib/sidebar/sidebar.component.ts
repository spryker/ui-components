import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { PersistenceService, ToBoolean } from '@spryker/utils';
import { of, ReplaySubject, merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  private static SidebarId = 'spy-sidebar-is-collapsed';

  @Input() width = 250;
  @Input() collapsedWidth = 62;
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() @ToBoolean() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsedStateRetrieved = false;
  arrowIcon = IconArrowDownModule.icon;

  setCollapsedState$ = new ReplaySubject<boolean>();
  initialState$ = this.persistenceService
    .retrieve(SidebarComponent.SidebarId)
    .pipe(
      tap(() => {
        this.isCollapsedStateRetrieved = true;
      }),
    );

  collapsed$ = merge(this.initialState$, this.setCollapsedState$).pipe(
    tap(isCollapsed => {
      console.log(isCollapsed);
      if (this.isCollapsedStateRetrieved) {
        this.isCollapsedStateRetrieved = false;
      } else {
        this.persistenceService.save(SidebarComponent.SidebarId, isCollapsed);
      }
    }),
  );

  constructor(private persistenceService: PersistenceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('collapsed' in changes) {
      this.setCollapsedState$.next(this.isCollapsed());
    }
  }

  updateCollapse(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
    this.setCollapsedState$.next(this.isCollapsed());
    this.collapsedChange.emit(this.isCollapsed());
  }

  collapse(): void {
    this.collapsed = true;
    this.setCollapsedState$.next(this.isCollapsed());
  }

  expand(): void {
    this.collapsed = false;
    this.setCollapsedState$.next(this.isCollapsed());
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
