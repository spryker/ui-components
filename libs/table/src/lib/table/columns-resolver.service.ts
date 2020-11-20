import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ColumnsTransformer, TableColumns } from './table';

@Injectable()
export class TableColumnsResolverService {
  private transformers$ = new BehaviorSubject(new Set<ColumnsTransformer>());

  constructor(private http: HttpClient) {}

  resolve(colsOrUrl: string | TableColumns): Observable<TableColumns> {
    const colsObservable =
      typeof colsOrUrl === 'string'
        ? this.http.get<TableColumns>(colsOrUrl)
        : of(colsOrUrl);

    return combineLatest([colsObservable, this.transformers$]).pipe(
      switchMap(([columns, transformers]) =>
        [...transformers].reduce(
          (columns$, transformer) => columns$.pipe(switchMap(transformer)),
          of(columns),
        ),
      ),
    );
  }

  addTransformer(transformer: ColumnsTransformer): void {
    const transformers = this.transformers$.getValue();
    const originalSize = transformers.size;

    transformers.add(transformer);

    if (originalSize === transformers.size) {
      return;
    }

    this.transformers$.next(transformers);
  }
}
