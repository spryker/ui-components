import { Injectable } from '@angular/core';
import { TableComponent } from '../table';
import { InternalTableLocatorService } from './internal-table-locator.service';

@Injectable({
  providedIn: 'root',
  useExisting: InternalTableLocatorService,
})
export abstract class TableLocatorService {
  abstract findById(id: string): TableComponent | undefined;
}
