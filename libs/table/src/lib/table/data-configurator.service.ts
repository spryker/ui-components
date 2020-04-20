import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  scan,
  shareReplay,
  startWith,
  switchMap,
  switchAll,
} from 'rxjs/operators';
import { TableDataConfig } from './table';

export interface InitialDataStrategy {
  getData(): Observable<TableDataConfig>;
}

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$ = new Subject<TableDataConfig>();
  private resetConfig$ = new Subject<TableDataConfig>();
  private initialDataStrategy: InitialDataStrategy = new DefaultInitialDataStrategy();
  private initialData$ = new Subject<Observable<TableDataConfig>>();

  readonly config$: Observable<TableDataConfig> = this.resetConfig$.pipe(
    startWith({}),
    switchMap(() => this.initialData$),
    switchAll(),
    switchMap(internalConfig =>
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
