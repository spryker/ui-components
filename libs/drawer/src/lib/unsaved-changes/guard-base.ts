import { Injectable, Injector, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

import { InterceptionComposerService } from '@spryker/interception';
import { UnsavedChangesGuard } from './guard';
import { UnsavedChangesGuardToken } from './guard.token';
import { UnsavedChangesMonitor, UnsavedChangesMonitorStatus } from './monitor';

@Injectable()
export abstract class UnsavedChangesGuardBase
  implements OnDestroy, UnsavedChangesGuard {
  protected monitors$ = new BehaviorSubject<UnsavedChangesMonitor[]>([]);

  protected monitorStatuses$ = this.monitors$.pipe(
    tap(monitors => console.log('monitors', monitors)),
    switchMap(monitors =>
      monitors.length
        ? combineLatest(
            monitors.map(monitor =>
              monitor.getStatus().pipe(distinctUntilChanged()),
            ),
          )
        : of([]),
    ),
  );

  protected hasDirtyStatus$ = this.monitorStatuses$.pipe(
    tap(statuses => console.log('statuses', statuses)),
    map(statuses =>
      statuses.some(status => status === UnsavedChangesMonitorStatus.Dirty),
    ),
    tap(hasDirtyStatus => console.log('hasDirtyStatus', hasDirtyStatus)),
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
    console.log('attachMonitor', monitor);
    this.monitors$.getValue().push(monitor);
    this.monitors$.next(this.monitors$.getValue());

    this.parentGuard?.attachMonitor(monitor);
  }

  detachMonitor(monitor: UnsavedChangesMonitor): void {
    console.log('detachMonitor', monitor);
    const idx = this.monitors$.getValue().indexOf(monitor);

    if (idx !== -1) {
      this.monitors$.getValue().splice(idx, 1);
      this.monitors$.next(this.monitors$.getValue());
    }

    this.parentGuard?.detachMonitor(monitor);
  }

  init(): void {}

  dispose(): void {
    this.monitors$.complete();
    this.monitors$.next([]);
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
