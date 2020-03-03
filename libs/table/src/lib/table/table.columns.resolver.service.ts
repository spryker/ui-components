import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableColumns } from './table';

type ColumnsTransformer = (cols: TableColumns) => Observable<TableColumns>;

@Injectable()
export class TableColumnsResolverService {
  columns: ColumnsTransformer[] = [];

  constructor(private http: HttpClient) {
  }

  resolve(colsOrUrl: string | TableColumns): Observable<TableColumns> {
    const colsObservable = typeof colsOrUrl === 'string' ? this.http.get<TableColumns>(colsOrUrl) : of(colsOrUrl);

    return colsObservable;
  }

  addTransformer(transformer: ColumnsTransformer): void {
    this.columns = [...this.columns, transformer];
  };
}
