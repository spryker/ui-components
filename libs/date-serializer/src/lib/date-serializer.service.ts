import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DataSerializer } from './types';

@Injectable({ providedIn: 'root' })
export class DateSerializerService {
  constructor(private injector: Injector) {}

  serialize<D>(
    requestToken: InjectionToken<DataSerializer<D>>,
    data: D,
  ): unknown {
    return this.injector.get(requestToken, null)?.serialize(data) ?? data;
  }
}
