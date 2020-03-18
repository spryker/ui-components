import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { TableDataConfig } from './table';

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$ = new Subject<TableDataConfig>();
  private resetConfig$ = new Subject<TableDataConfig>();

  readonly config$: Observable<TableDataConfig> = this.resetConfig$.pipe(
    startWith({}),
    switchMap(internalConfig =>
      this.internalConfig$.pipe(
        startWith(internalConfig),
        scan((config, newConfig) => ({ ...config, ...newConfig })),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

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
