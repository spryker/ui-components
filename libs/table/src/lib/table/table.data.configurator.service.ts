import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, pairwise, shareReplay, startWith } from 'rxjs/operators';

export type TableDataConfig = Record<string, unknown>;

@Injectable()
export class TableDataConfiguratorService {
  private internalConfig$: ReplaySubject<TableDataConfig> = new ReplaySubject(
    1,
  );

  readonly config$: Observable<TableDataConfig> = this.internalConfig$.pipe(
    startWith({}),
    pairwise(),
    map(params => ({ ...params[0], ...params[1] })),
    shareReplay(),
  );

  update(criteria: TableDataConfig): void {
    this.internalConfig$.next(criteria);
  }

  changePage(page: number): void {
    this.internalConfig$.next({ page });
  }

  reset(): void {
    this.internalConfig$.next({ page: 0 });
  }
}
