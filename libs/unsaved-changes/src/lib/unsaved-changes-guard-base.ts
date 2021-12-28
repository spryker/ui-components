import { Injectable, Injector, OnDestroy } from '@angular/core';
import { InterceptionComposerService } from '@spryker/interception';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

import { UnsavedChangesGuard } from './unsaved-changes-guard';
import { UnsavedChangesGuardToken } from './unsaved-changes-guard.token';
import {
  UnsavedChangesMonitor,
  UnsavedChangesMonitorStatus,
} from './unsaved-changes-monitor';

/**
 * Common behavior for all guards in a form of Angular Service that implements registry of monitors as well as their propagation within the tree.
 * Exposes stream of all monitors aggregated state that may be used to determine if guard should take action on destructive event.
 */
@Injectable()
export abstract class UnsavedChangesGuardBase
  implements OnDestroy, UnsavedChangesGuard
{
  protected monitors$ = new BehaviorSubject(new Set<UnsavedChangesMonitor>());

  protected monitorStatuses$ = this.monitors$.pipe(
    switchMap((monitors) =>
      monitors.size
        ? combineLatest(
            [...monitors].map((monitor) =>
              monitor.getStatus().pipe(distinctUntilChanged()),
            ),
          )
        : of([]),
    ),
  );

  protected hasDirtyStatus$ = this.monitorStatuses$.pipe(
    map((statuses) =>
      statuses.some((status) => status === UnsavedChangesMonitorStatus.Dirty),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private interceptionComposer = this.injector.get(
    InterceptionComposerService,
    null,
  );

  protected parentGuard = this.interceptionComposer?.getService(
    UnsavedChangesGuardToken,
    true,
  );

  constructor(protected injector: Injector) {
    setTimeout(() => this.init(), 0);
  }

  attachMonitor(monitor: UnsavedChangesMonitor): void {
    this.monitors$.getValue().add(monitor);
    this.monitors$.next(this.monitors$.getValue());

    this.parentGuard?.attachMonitor(monitor);
  }

  detachMonitor(monitor: UnsavedChangesMonitor): void {
    const isMonitorExist = this.monitors$.getValue().has(monitor);

    if (isMonitorExist) {
      this.monitors$.getValue().delete(monitor);
      this.monitors$.next(this.monitors$.getValue());
    }

    this.parentGuard?.detachMonitor(monitor);
  }

  resetMonitors(): void {
    this.monitors$.getValue().forEach((monitor) => monitor.reset());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init(): void {}

  dispose(): void {
    this.monitors$.getValue().clear();
    this.monitors$.complete();
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
