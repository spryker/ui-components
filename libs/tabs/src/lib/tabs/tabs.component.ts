import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  HostBinding,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap, map, takeUntil, startWith } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'spy-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnInit, OnDestroy {
  tabReference = TabComponent;
  tabs$ = new BehaviorSubject<TabComponent[]>([]);
  hasWarning$ = this.tabs$.pipe(
    switchMap((tabs: TabComponent[]) => {
      return combineLatest(
        tabs.map((tab: TabComponent) =>
          tab.hasWarningChange.pipe(startWith(tab.hasWarning)),
        ),
      );
    }),
    map((hasWarnings: boolean[]) =>
      hasWarnings.some((hasWarning: boolean) => hasWarning),
    ),
  );
  destroyed$ = new Subject<void>();

  @Input() tab = 0;
  @Input() mode: 'line' | 'card' = 'line';

  @HostBinding('class.tabs--warning') hasWarning = false;

  @Output() tabChange = new EventEmitter<number>();

  @ContentChildren(TabComponent)
  set contentTabs(childrenTabs: QueryList<TabComponent>) {
    this.tabs$.next(childrenTabs.toArray());
  }

  ngOnInit(): void {
    this.hasWarning$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(hasWarning => (this.hasWarning = hasWarning));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  activateTab(index: number): void {
    if (!this.isTabInRange(index)) {
      return;
    }

    this.tab = index;

    this.tabChange.emit(this.currentActiveTab());
  }

  toNextTab(): number {
    const newTab = this.tab + 1;

    if (!this.isTabInRange(newTab)) {
      return this.currentActiveTab();
    }

    this.tab = newTab;
    this.tabChange.emit(this.currentActiveTab());

    return this.currentActiveTab();
  }

  toPrevTab(): number {
    const newTab = this.tab - 1;

    if (!this.isTabInRange(newTab)) {
      return this.currentActiveTab();
    }

    this.tab = newTab;
    this.tabChange.emit(this.currentActiveTab());

    return this.currentActiveTab();
  }

  currentActiveTab(): number {
    return this.tab;
  }

  tabsFound(tabs: TabComponent[]): void {
    this.tabs$.next(tabs);
  }

  private isTabInRange(index: number): boolean {
    return index >= 0 && index < this.tabs$.getValue().length;
  }
}
