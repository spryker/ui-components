import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableLocatorService } from './table-locator.service';
import { TableComponent } from '../table';

@Injectable({
  providedIn: 'root',
})
export class InternalTableLocatorService implements TableLocatorService {
  private tableIdsMap = new Map<string, TableComponent>();

  findById(id: string): TableComponent | undefined {
    return this.tableIdsMap.get(id);
  }

  register(table: TableComponent): Observable<void> {
    return new Observable<void>(() => {
      const tableId = table.tableId;

      if (!tableId) {
        return () => of(void 0);
      }

      this.tableIdsMap.set(tableId, table);

      return () => {
        this.tableIdsMap.delete(tableId);
      };
    });
  }
}
