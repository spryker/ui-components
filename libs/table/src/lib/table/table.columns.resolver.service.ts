import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableColumns } from './table';
import { switchMap } from "rxjs/operators";

type ColumnsTransformer = (cols: TableColumns) => Observable<TableColumns>;

@Injectable()
export class TableColumnsResolverService {
  private transformers$ = new BehaviorSubject<ColumnsTransformer[]>([]);

  constructor(private http: HttpClient) {
  }

  resolve(colsOrUrl: string | TableColumns): Observable<TableColumns> {
    const colsObservable =
      typeof colsOrUrl === 'string'
        ? this.http.get<TableColumns>(colsOrUrl)
        : of(colsOrUrl);


    return combineLatest(
      [colsObservable, this.transformers$]
    ).pipe(
      switchMap(([columns, transformers]) => (
        transformers.reduce((columns$, transformer) => (
          columns$.pipe(
            switchMap(transformer),
          )
        ), of(columns))
      )),
    );
  }

  addTransformer(transformer: ColumnsTransformer): void {
    this.transformers$.next([...this.transformers$.getValue(), transformer]);
  }
}
