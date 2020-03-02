import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableData } from './table';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableDataFetcherService {
  constructor(private http: HttpClient) {}

  resolve(dataUrl: string): Observable<TableData> {
    return this.http.get<TableData>(dataUrl);
  }
}
