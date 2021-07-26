import { Observable } from 'rxjs';

import { TableEventBus } from '../table/table-event-bus';

export class TableFeatureEventBus {
  constructor(private name: string, private tableEventBus: TableEventBus) {}

  emit<D = unknown>(data: D, eventName?: string): void {
    this.tableEventBus.emit(this.name, data, eventName);
  }

  on<D = unknown>(feature: string, eventName?: string): Observable<D> {
    return this.tableEventBus.on<D>(feature, eventName);
  }
}
