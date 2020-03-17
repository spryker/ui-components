import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { TableDataConfig } from './table';

let resetConfig = {};

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$ = new ReplaySubject<TableDataConfig>(1);

  readonly config$: Observable<TableDataConfig> = this.internalConfig$.pipe(
    scan((config, newConfig) => {
      const isResetConfig = newConfig === resetConfig;

      if (isResetConfig && !Object.keys(resetConfig).length) {
        return { page: 0 };
      }

      if (isResetConfig) {
        return resetConfig;
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

  reset(config?: TableDataConfig): void {
    if (config) {
      resetConfig = config;
    }

    this.internalConfig$.next(resetConfig);
  }
}
