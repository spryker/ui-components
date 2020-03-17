import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { TableDataConfig } from './table';

const resetConfig = {};

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$ = new ReplaySubject<TableDataConfig>(1);

  readonly config$: Observable<TableDataConfig> = this.internalConfig$.pipe(
    scan((config, newConfig) => {
      if (newConfig === resetConfig) {
        return { page: 0 };
      }

      return { ...config, ...newConfig };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  update(criteria: TableDataConfig): void {
    this.internalConfig$.next(criteria);
  }

  changePage(page: number): void {
    this.internalConfig$.next({ page });
  }

  reset(): void {
    this.internalConfig$.next(resetConfig);
  }
}
