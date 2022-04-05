import { Injectable } from '@angular/core';
import { merge, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  scan,
  shareReplay,
  startWith,
  switchAll,
  switchMap,
} from 'rxjs/operators';

import { TableDataConfig } from './table';

export interface InitialDataStrategy {
  getData(): Observable<TableDataConfig>;
}

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$ = new Subject<TableDataConfig>();
  private resetConfig$ = new ReplaySubject<TableDataConfig>();
  private initialDataStrategy: InitialDataStrategy =
    new DefaultInitialDataStrategy();
  private initialData$ = new ReplaySubject<Observable<TableDataConfig>>(1);

  readonly config$: Observable<TableDataConfig> = merge(
    this.initialData$.pipe(switchAll()),
    this.resetConfig$,
  ).pipe(
    switchMap((internalConfig) =>
      this.internalConfig$.pipe(
        startWith(internalConfig),
        scan((config, newConfig) => ({ ...config, ...newConfig })),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  provideInitialDataStrategy(initialDataStrategy: InitialDataStrategy): void {
    this.initialDataStrategy = initialDataStrategy;
  }

  triggerInitialData(): void {
    this.initialData$.next(this.initialDataStrategy.getData());
  }

  update(criteria: TableDataConfig): void {
    this.internalConfig$.next(criteria);
  }

  changePage(page: number): void {
    this.internalConfig$.next({ page });
  }

  reset(config: TableDataConfig = { page: 1 }): void {
    this.resetConfig$.next(config);
  }
}

export class DefaultInitialDataStrategy implements InitialDataStrategy {
  getData(): Observable<TableDataConfig> {
    return of({ page: 1 });
  }
}
