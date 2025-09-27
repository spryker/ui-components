import { Injectable, InjectionToken, Injector, inject } from '@angular/core';
import { DataSerializer } from './types';

@Injectable({ providedIn: 'root' })
export class DataSerializerService {
    private injector = inject(Injector);

    serialize<D>(token: InjectionToken<DataSerializer<D>>, data: D): unknown {
        return this.injector.get(token, null)?.serialize(data) ?? data;
    }
}
