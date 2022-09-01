import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DataSerializer } from './types';

@Injectable({ providedIn: 'root' })
export class DataSerializerService {
    constructor(private injector: Injector) {}

    serialize<D>(token: InjectionToken<DataSerializer<D>>, data: D): unknown {
        return this.injector.get(token, null)?.serialize(data) ?? data;
    }
}
